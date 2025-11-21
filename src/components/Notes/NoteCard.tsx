import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { Note } from '../../types';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

export const NoteCard = ({ note, onPress, onDelete }: NoteCardProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const [isDeleting, setIsDeleting] = React.useState(false);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const colors = [
    { bg: '#FBCFE8', accent: '#EC4899' },
    { bg: '#BFDBFE', accent: '#3B82F6' },
    { bg: '#BBF7D0', accent: '#10B981' },
    { bg: '#FDE68A', accent: '#F59E0B' },
    { bg: '#DDD6FE', accent: '#8B5CF6' },
    { bg: '#99F6E4', accent: '#14B8A6' },
  ];

  const colorIndex = parseInt(note.id.slice(-1), 16) % colors.length;
  const colorScheme = colors[colorIndex];

  const handlePressIn = () => {
    if (!isDeleting) {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!isDeleting) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleCardPress = () => {
    if (!isDeleting) {
      onPress();
    }
  };

  const handleDeletePress = () => {
    setIsDeleting(true);
    onDelete();
    setTimeout(() => setIsDeleting(false), 100);
  };

  return (
    <Animated.View style={[styles.cardContainer, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={styles.card}
        onPress={handleCardPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={isDeleting}
      >
        {note.image ? (
          <Image source={{ uri: note.image }} style={styles.image} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colorScheme.bg }]}>
            <View style={[styles.iconCircle, { backgroundColor: colorScheme.accent }]}>
              <Text style={styles.placeholderIcon}>📝</Text>
            </View>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {note.title || 'Untitled'}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeletePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteIcon}>🗑</Text>
            </TouchableOpacity>
          </View>

          {note.body ? (
            <Text style={styles.body} numberOfLines={3}>
              {truncateText(note.body, 120)}
            </Text>
          ) : (
            <Text style={styles.emptyBody}>No content</Text>
          )}

          <View style={styles.footer}>
            <Text style={styles.date}>
              {new Date(note.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
            {note.image && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>📷</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  image: {
    width: '100%',
    height: 180,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 36,
  },
  content: {
    padding: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    lineHeight: 26,
    marginRight: 12,
  },
  deleteButton: {
    padding: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 18,
  },
  body: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 14,
    lineHeight: 22,
  },
  emptyBody: {
    fontSize: 15,
    color: '#D1D5DB',
    fontStyle: 'italic',
    marginBottom: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 14,
  },
});