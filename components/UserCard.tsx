/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MessageCircle, UserPlus, Mars, Venus } from 'lucide-react-native';

interface User {
  id: string;
  fullName: string;
  handle: string;
  age: number;
  gender: string;
  country: string;
  city: string;
  bio: string;
  profilePicUrl: string;
  onlineStatus: boolean;
}

interface UserCardProps {
  user: User;
  onChatPress: () => void;
  onProfilePress: () => void;
  onFriendPress: () => void;
}

export function UserCard({ user, onChatPress, onProfilePress, onFriendPress }: UserCardProps) {
  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'UK': '🇬🇧',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵',
      'Brazil': '🇧🇷',
    };
    return flags[country] || '🌍';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onProfilePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.profilePicUrl }} style={styles.profileImage} />
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, user.onlineStatus ? styles.online : styles.offline]} />
          <Text style={styles.statusText}>
            {user.onlineStatus ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{user.fullName}</Text>
          {user.gender === 'Male' ? (
            <Mars color="#666666" size={14} />
          ) : (
            <Venus color="#666666" size={14} />
          )}
        </View>
        
        <Text style={styles.handle}>{user.handle}</Text>
        
        <View style={styles.locationRow}>
          <Text style={styles.age}>{user.age} • {getCountryFlag(user.country)}</Text>
        </View>
        
        <Text style={styles.bio} numberOfLines={1}>{user.bio}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.friendButton}
            onPress={onFriendPress}
          >
            <Text style={styles.friendButtonText}>Friend</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.chatButton}
            onPress={onChatPress}
          >
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#F0E6D6',
  },
  profileImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#F0E6D6',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  online: {
    backgroundColor: '#4CAF50',
  },
  offline: {
    backgroundColor: '#999999',
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  content: {
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    flex: 1,
  },
  handle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  age: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  bio: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 18,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  friendButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6FA',
    borderRadius: 12,
    paddingVertical: 10,
  },
  friendButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#0000FF',
  },
  chatButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000FF',
    borderRadius: 12,
    paddingVertical: 10,
  },
  chatButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MessageCircle, UserPlus, Mars, Venus } from 'lucide-react-native';

interface User {
  id: string;
  fullName: string;
  handle: string;
  age: number;
  gender: string;
  country: string;
  city: string;
  bio: string;
  profilePicUrl: string;
  onlineStatus: boolean;
}

interface UserCardProps {
  user: User;
  onChatPress: () => void;
  onProfilePress: () => void;
  onFriendPress: () => void;
}

export function UserCard({ user, onChatPress, onProfilePress, onFriendPress }: UserCardProps) {
  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      USA: '🇺🇸',
      Canada: '🇨🇦',
      UK: '🇬🇧',
      Australia: '🇦🇺',
      Germany: '🇩🇪',
      France: '🇫🇷',
      Japan: '🇯🇵',
      Brazil: '🇧🇷',
    };
    return flags[country] || '🌍';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onProfilePress}>

      {/* TOP IMAGE AREA */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.profilePicUrl }} style={styles.profileImage} />

        {/* Status Badge */}
        <View style={styles.statusBadge}>
          <View
            style={[
              styles.statusDot,
              user.onlineStatus ? styles.online : styles.offline,
            ]}
          />
          <Text style={styles.statusText}>
            {user.onlineStatus ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>

      {/* CONTENT AREA */}
      <View style={styles.content}>
        {/* Name + Gender */}
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {user.fullName}
          </Text>
          {user.gender === 'Male' ? (
            <Mars color="#767676" size={14} />
          ) : (
            <Venus color="#767676" size={14} />
          )}
        </View>

        <Text style={styles.handle}>{user.handle}</Text>

        {/* Age + Country */}
        <View style={styles.locationRow}>
          <Text style={styles.age}>
            {user.age} • {getCountryFlag(user.country)}
          </Text>
        </View>

        {/* Bio */}
        <Text style={styles.bio} numberOfLines={1}>
          {user.bio}
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.friendButton} onPress={onFriendPress}>
            <Text style={styles.friendButtonText}>Friend</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatButton} onPress={onChatPress}>
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginBottom: 20,
  },

  /* IMAGE */
  imageContainer: {
    position: 'relative',
    backgroundColor: '#F6EDE2',
  },
  profileImage: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },

  /* STATUS BADGE */
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  online: {
    backgroundColor: '#3ED65F',
  },
  offline: {
    backgroundColor: '#A0A0A0',
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },

  /* CONTENT */
  content: {
    padding: 16,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 4,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    flex: 1,
  },
  handle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#787878',
    marginBottom: 6,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  age: {
    fontSize: 14,
    color: '#787878',
    fontFamily: 'Inter-Regular',
  },

  bio: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B6B6B',
    marginBottom: 14,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },

  /* FRIEND BUTTON */
  friendButton: {
    flex: 1,
    backgroundColor: '#EDEBFF',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendButtonText: {
    color: '#1D1AFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },

  /* CHAT BUTTON */
  chatButton: {
    flex: 1,
    backgroundColor: '#1D1AFF',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});

