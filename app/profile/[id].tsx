import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MessageCircle, UserPlus, MapPin, GraduationCap, Briefcase } from 'lucide-react-native';
import { mockUsers } from '@/data/mockUsers';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const [friendRequested, setFriendRequested] = useState(false);
  
  // Find user by id
  const user = mockUsers.find(u => u.id === id);
  
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleFriendRequest = () => {
    setFriendRequested(true);
    // TODO: Send friend request to Firebase
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'UK': '🇬🇧',
      'Australia': '🇦🇺',
    };
    return flags[country] || '🌍';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user.profilePicUrl }} style={styles.profileImage} />
            <View style={[styles.onlineIndicator, user.onlineStatus ? styles.online : styles.offline]} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.fullName}</Text>
            <Text style={styles.profileHandle}>{user.handle}</Text>
            <View style={styles.profileMeta}>
              <Text style={styles.profileAge}>{user.age} years old</Text>
              <Text style={styles.profileLocation}>
                {getCountryFlag(user.country)} {user.city}, {user.country}
              </Text>
            </View>
            <Text style={styles.onlineStatus}>
              {user.onlineStatus ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.friendButton, friendRequested && styles.friendButtonRequested]}
            onPress={handleFriendRequest}
            disabled={friendRequested}
          >
            <UserPlus color={friendRequested ? "#666666" : "#2D63FF"} size={20} />
            <Text style={[styles.friendButtonText, friendRequested && styles.friendButtonTextRequested]}>
              {friendRequested ? 'Request Sent' : 'Add Friend'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => router.push(`/chat/private/${user.id}`)}
          >
            <MessageCircle color="#FFFFFF" size={20} />
            <Text style={styles.chatButtonText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.tagsContainer}>
            {user.interests.map((interest, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.tagsContainer}>
            {user.skills.map((skill, index) => (
              <View key={index} style={[styles.tag, styles.skillTag]}>
                <Text style={[styles.tagText, styles.skillTagText]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Background Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background</Text>
          
          <View style={styles.backgroundItem}>
            <GraduationCap color="#666666" size={20} />
            <Text style={styles.backgroundText}>{user.education}</Text>
          </View>
          
          <View style={styles.backgroundItem}>
            <Briefcase color="#666666" size={20} />
            <Text style={styles.backgroundText}>{user.occupation}</Text>
          </View>
        </View>

        {/* Gallery Section */}
        {user.gallery.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <View style={styles.galleryGrid}>
              {user.gallery.map((image, index) => (
                <TouchableOpacity key={index} style={styles.galleryItem}>
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    textAlign: 'center',
    flex: 1,
    marginRight: 40,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  online: {
    backgroundColor: '#4CAF50',
  },
  offline: {
    backgroundColor: '#999999',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  profileMeta: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  profileAge: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
  },
  profileLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  onlineStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  friendButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2D63FF',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  friendButtonRequested: {
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F7FA',
  },
  friendButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D63FF',
  },
  friendButtonTextRequested: {
    color: '#666666',
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D63FF',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  chatButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E8F1FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D63FF',
  },
  skillTag: {
    backgroundColor: '#F0F0F0',
  },
  skillTagText: {
    color: '#666666',
  },
  backgroundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  backgroundText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});