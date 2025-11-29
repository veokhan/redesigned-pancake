# ID Connect

## Overview

ID Connect is a cross-platform social networking mobile application built with React Native and Expo. The app enables users to discover and connect with people worldwide through features like profile browsing, real-time messaging, friend requests, and location-based filtering. It's designed to run on iOS, Android, and web platforms using a unified codebase.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**November 29, 2025 - Search & Filter Page Update**
- Refined UI of Search & Filter page (`app/search-filter.tsx`) to match Complete Profile styling
- Added new filter options:
  - **Age Range**: Min and max age inputs with numeric validation
  - **Education/Work**: Radio button toggle (All/Education/Work) with degree level dropdown for Education
- Replaced native Picker components with styled modal dropdowns
- Implemented underline-style inputs matching the Complete Profile aesthetic
- Fixed filter state handling to clear degree selection when switching away from Education

**November 29, 2025 - My Profile Page Update**
- Redesigned My Profile page (`app/(tabs)/profile.tsx`) to match Complete Profile page layout
- Implemented selective editability:
  - **Editable fields**: Profile picture, Bio, Education/Work section
  - **Read-only fields**: Name, Handle, Age, Gender, Location (displayed as gray text with underline styling)
- Added underline-style form inputs matching the Complete Profile aesthetic
- Maintained AsyncStorage persistence for saved institutions and companies

## System Architecture

### Frontend Architecture

**Framework Choice: React Native with Expo**
- **Rationale**: Expo provides a managed workflow that simplifies mobile development with cross-platform compatibility (iOS, Android, Web)
- **Pros**: Single codebase for multiple platforms, extensive plugin ecosystem, hot reloading, easier deployment
- **Cons**: Some limitations on native modules, larger bundle size compared to bare React Native

**Navigation: Expo Router (File-based routing)**
- **Rationale**: Type-safe routing with automatic route generation based on file structure
- **Implementation**: Tab-based navigation for main features (Explore, Chats, Friends, Profile) with stack navigation for nested screens
- **Key routes**:
  - Authentication flow: `/onboarding`, `/auth/register`, `/auth/login`, `/auth/complete-profile`
  - Tab navigation: `/(tabs)/index` (Explore), `/(tabs)/global-chat`, `/(tabs)/friends`, `/(tabs)/profile`
  - Dynamic routes: `/profile/[id]`, `/chat/private/[id]`

**UI Component Strategy**
- Custom component library built from scratch using React Native primitives
- No external UI framework (Material UI, Native Base, etc.)
- Icon library: Lucide React Native for consistent iconography
- Typography: Inter font family (Regular, Medium, SemiBold, Bold) loaded via Google Fonts

**State Management**
- Local component state using React hooks (useState, useEffect)
- No global state management library implemented (Redux, MobX, Zustand)
- AsyncStorage for local data persistence (user preferences, saved institutions)

**Platform-Specific Considerations**
- Web-specific: Custom `useFrameworkReady` hook to signal when app is ready
- Responsive design: Window dimensions and media queries for different screen sizes
- Platform detection using `Platform.OS` for conditional rendering

### Data Layer

**Current Implementation: Mock Data**
- Static user data stored in `/data/mockUsers.ts`
- In-memory state for messages, friend requests, and chats
- No backend integration currently implemented

**Planned Architecture (Backend Not Yet Implemented)**
- Authentication system referenced but not connected (Firebase mentions in comments)
- Future backend integration points identified in:
  - User authentication (login/register screens)
  - Real-time messaging
  - Friend request system
  - User profile management

**Local Storage**
- AsyncStorage used for:
  - Saved educational institutions
  - Saved companies/workplaces
  - User preferences and profile data

### Media & Device Features

**Image Handling**
- expo-image-picker for profile photos and gallery uploads
- Remote image URLs for user avatars and galleries
- Default avatar fallback for incomplete profiles

**Location Services**
- expo-location for fetching user's current location
- Location-based filtering capability in search feature
- City and country fields in user profiles

**Camera Integration**
- expo-camera for potential direct photo capture
- Permission handling for iOS and Android

### Authentication & User Flow

**Onboarding Flow**
1. Landing screen with app introduction
2. Registration with email/password
3. Google authentication option (UI present, not connected)
4. Complete profile with detailed information:
   - Basic info (name, handle, age, gender)
   - Location (auto-detect or manual entry)
   - Education or work information
   - Profile photo upload
   - Bio and interests

**Profile Completion Strategy**
- Multi-step form with education/work toggle
- Degree selection dropdown (for students)
- Intermediate/A-Level group selection (for students)
- Institution and company autocomplete suggestions
- Persistent storage of frequently used institutions

### Feature Architecture

**User Discovery (Explore)**
- Grid-based user card layout
- Filter and search functionality (`/search-filter` screen)
- Filters: country, city, gender, online status
- Direct actions: message, view profile, send friend request

**Messaging System**
- Two-tier chat architecture:
  - Global chat room (community-wide)
  - Private 1-on-1 conversations
- Message structure: sender ID, text, timestamp, delivery status
- Message limit system for new connections (5 messages before friend acceptance)
- Real-time scrolling to latest messages

**Friend Management**
- Friend request system with accept/decline actions
- Mutual friends display
- Online/offline status indicators
- Last seen timestamps for offline users

**User Profiles**
- Detailed profile view with:
  - Profile photo and gallery
  - Basic information (age, gender, location)
  - Bio and interests
  - Skills showcase
  - Education/occupation details
- Profile editing capability (My Profile tab)

## External Dependencies

### Core Framework
- **expo**: SDK 54 - Managed React Native workflow and build tools
- **react**: 19.1.0 - UI framework
- **react-native**: 0.81.4 - Mobile platform runtime

### Navigation & Routing
- **expo-router**: ~6.0.8 - File-based routing system
- **@react-navigation/native**: ^7.0.14 - Navigation primitives
- **@react-navigation/bottom-tabs**: ^7.2.0 - Tab navigation
- **react-native-screens**: ~4.16.0 - Native screen primitives
- **react-native-safe-area-context**: ~5.6.0 - Safe area handling

### UI & Styling
- **@expo-google-fonts/inter**: ^0.2.3 - Typography (Inter font family)
- **lucide-react-native**: ^0.544.0 - Icon library
- **@expo/vector-icons**: ^15.0.2 - Additional icon sets
- **react-native-svg**: 15.12.1 - SVG rendering
- **expo-linear-gradient**: ~15.0.7 - Gradient backgrounds
- **expo-blur**: ~15.0.7 - Blur effects

### Device Features & Permissions
- **expo-camera**: ~17.0.8 - Camera access for photo capture
- **expo-image-picker**: ^17.0.0 - Photo library and image selection
- **expo-location**: ^19.0.7 - GPS and location services
- **expo-haptics**: ~15.0.7 - Haptic feedback

### Storage & Data
- **@react-native-async-storage/async-storage**: ^2.2.0 - Local key-value storage
- **@react-native-picker/picker**: ^2.11.4 - Native picker components

### Platform Support
- **react-native-web**: ^0.21.0 - Web platform support
- **react-native-webview**: 13.15.0 - WebView component
- **expo-web-browser**: ~15.0.7 - In-app browser functionality

### Animations & Gestures
- **react-native-reanimated**: ~4.1.1 - Advanced animations
- **react-native-gesture-handler**: ~2.28.0 - Native gesture handling

### Utilities
- **expo-constants**: ~18.0.9 - App and device constants
- **expo-linking**: ~8.0.8 - Deep linking support
- **expo-splash-screen**: ~31.0.10 - Splash screen management
- **expo-status-bar**: ~3.0.8 - Status bar styling
- **react-native-url-polyfill**: ^2.0.0 - URL polyfill for React Native

### Development Tools
- **TypeScript**: Type safety with strict mode enabled
- **Babel**: ^7.25.2 - JavaScript transpilation
- **Path aliases**: `@/*` mapped to root directory for cleaner imports

### Notable Absence
**No Backend Service Currently Integrated**
- Comments in code reference Firebase for authentication and real-time features
- No database client library present (no Firestore, Supabase, or similar)
- No API client library (no Axios, fetch wrappers)
- All data currently mocked in frontend