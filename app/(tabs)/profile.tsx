import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import { Edit2, ChevronDown } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

const defaultAvatar = require("../../assets/default-avatar.png");

export default function MyProfileScreen() {
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [fullName] = useState("John Doe");
  const [handle] = useState("@johndoe");
  const [age] = useState("25");
  const [gender] = useState("Male");
  const [location] = useState("New York, USA");
  const [bio, setBio] = useState("");
  const [occupationType, setOccupationType] = useState<"education" | "work">("education");
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [degreeDropdownVisible, setDegreeDropdownVisible] = useState(false);
  const [intermediateDropdownVisible, setIntermediateDropdownVisible] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedIntermediateGroup, setSelectedIntermediateGroup] = useState("");
  const [savedInstitutions, setSavedInstitutions] = useState<string[]>([]);
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedInstitutions = await AsyncStorage.getItem('saved_institutions');
      if (storedInstitutions) {
        setSavedInstitutions(JSON.parse(storedInstitutions));
      }
      const storedCompanies = await AsyncStorage.getItem('saved_companies');
      if (storedCompanies) {
        setSavedCompanies(JSON.parse(storedCompanies));
      }
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const handleInstitutionChange = (text: string) => {
    setInstitution(text);
    if (text.length > 0) {
      const source = occupationType === "education" ? savedInstitutions : savedCompanies;
      const filtered = source.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectInstitution = (name: string) => {
    setInstitution(name);
    setShowSuggestions(false);
  };

  const degreeOptions = ["Primary", "Middle", "Matric", "Intermediate"];
  const intermediateOptions = [
    "F.Sc (Pre-Medical)",
    "F.Sc (Pre-Engineering)",
    "F.A (Arts / Humanities)",
    "ICS (Computer Science)",
    "I.Com (Commerce)",
    "DAE (Diploma of Associate Engineering)",
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    if (institution) {
      if (occupationType === "education") {
        const newInstitutions = Array.from(new Set([...savedInstitutions, institution]));
        setSavedInstitutions(newInstitutions);
        AsyncStorage.setItem('saved_institutions', JSON.stringify(newInstitutions)).catch(e => console.error(e));
      } else {
        const newCompanies = Array.from(new Set([...savedCompanies, institution]));
        setSavedCompanies(newCompanies);
        AsyncStorage.setItem('saved_companies', JSON.stringify(newCompanies)).catch(e => console.error(e));
      }
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      Alert.alert("Success", "Profile updated successfully!");
    } catch {
      Alert.alert("Error", "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBorderColor = (field: string) =>
    focusedField === field ? "#3F51B5" : "#CBD5E1";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <Image source={profileImage} style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
              <Edit2 size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileTitle}>Add a profile photo</Text>
          <Text style={styles.profileSubtitle}>
            This helps people recognize you.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.readOnlyField}>
                <Text style={styles.readOnlyText}>{fullName}</Text>
              </View>
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Handle</Text>
              <View style={styles.readOnlyField}>
                <Text style={styles.readOnlyText}>{handle}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Age</Text>
              <View style={styles.readOnlyField}>
                <Text style={styles.readOnlyText}>{age}</Text>
              </View>
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.readOnlyField}>
                <Text style={styles.readOnlyText}>{gender}</Text>
              </View>
            </View>
          </View>

          <View style={styles.fullInput}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.readOnlyField}>
              <Text style={styles.readOnlyText}>{location}</Text>
            </View>
          </View>

          <View style={styles.fullInput}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[
                styles.input,
                styles.bioInput,
                { borderColor: getBorderColor("bio") },
              ]}
              placeholder="Short bio (100 characters max)"
              placeholderTextColor="#a0a0c0"
              value={bio}
              onChangeText={(text) => {
                if (text.length <= 100) {
                  setBio(text);
                }
              }}
              multiline
              numberOfLines={3}
              maxLength={100}
              onFocus={() => setFocusedField("bio")}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.occupation}>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setOccupationType("education")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    occupationType === "education" && styles.radioOuterSelected,
                  ]}
                >
                  {occupationType === "education" && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>Education</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setOccupationType("work")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    occupationType === "work" && styles.radioOuterSelected,
                  ]}
                >
                  {occupationType === "work" && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>Work</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fullInput}>
              <Text style={styles.label}>
                {occupationType === "education"
                  ? "Institution Name"
                  : "Company Name"}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: getBorderColor("institution") },
                ]}
                placeholder={
                  occupationType === "education"
                    ? "e.g. Stanford University"
                    : "e.g. Google"
                }
                placeholderTextColor="#a0a0c0"
                value={institution}
                onChangeText={handleInstitutionChange}
                onFocus={() => {
                  setFocusedField("institution");
                  if (institution) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setFocusedField(null);
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <FlatList
                    data={filteredSuggestions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        onPress={() => selectInstitution(item)}
                      >
                        <Text style={styles.suggestionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                  />
                </View>
              )}
            </View>

            <View style={styles.fullInput}>
              <Text style={styles.label}>
                {occupationType === "education" ? "Degree Level" : "Role"}
              </Text>
              {occupationType === "education" ? (
                <>
                  <TouchableOpacity
                    style={[
                      styles.dropdown,
                      { borderColor: getBorderColor("degree") },
                    ]}
                    onPress={() => setDegreeDropdownVisible(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        !selectedDegree && { color: "#a0a0c0" },
                      ]}
                    >
                      {selectedDegree || "Select Degree Level"}
                    </Text>
                    <ChevronDown size={20} color="#6B7280" />
                  </TouchableOpacity>

                  {selectedDegree === "Intermediate" && (
                    <View style={{ marginTop: 16 }}>
                      <Text style={styles.label}>Intermediate Group</Text>
                      <TouchableOpacity
                        style={[
                          styles.dropdown,
                          { borderColor: getBorderColor("intermediate") },
                        ]}
                        onPress={() => setIntermediateDropdownVisible(true)}
                      >
                        <Text
                          style={[
                            styles.dropdownText,
                            !selectedIntermediateGroup && { color: "#a0a0c0" },
                          ]}
                        >
                          {selectedIntermediateGroup || "Select Group"}
                        </Text>
                        <ChevronDown size={20} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              ) : (
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: getBorderColor("role") },
                  ]}
                  placeholder="e.g. Software Engineer"
                  placeholderTextColor="#a0a0c0"
                  value={role}
                  onChangeText={setRole}
                  onFocus={() => setFocusedField("role")}
                  onBlur={() => setFocusedField(null)}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={degreeDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDegreeDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDegreeDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Degree Level</Text>
            {degreeOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  selectedDegree === option && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setSelectedDegree(option);
                  if (option !== "Intermediate") {
                    setSelectedIntermediateGroup("");
                  }
                  setDegreeDropdownVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedDegree === option && styles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {selectedDegree === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={intermediateDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIntermediateDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIntermediateDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Group</Text>
            {intermediateOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  selectedIntermediateGroup === option &&
                  styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setSelectedIntermediateGroup(option);
                  setIntermediateDropdownVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedIntermediateGroup === option &&
                    styles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {selectedIntermediateGroup === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveText}>
            {loading ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },

  content: { paddingHorizontal: 24 },

  profileSection: { alignItems: "center", paddingVertical: 24 },
  imageContainer: { position: "relative", width: 128, height: 128 },
  profileImage: { width: "100%", height: "100%", borderRadius: 64 },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 16,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  form: { marginTop: 8 },

  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  halfInput: { flex: 1 },
  fullInput: { marginBottom: 16 },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 8,
  },

  input: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1E293B",
  },

  readOnlyField: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 12,
  },
  readOnlyText: {
    fontSize: 16,
    color: "#94A3B8",
  },

  bioInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 24,
  },

  occupation: {},

  radioGroup: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#3F51B5",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3F51B5",
  },
  radioLabel: {
    fontSize: 16,
    color: "#1E293B",
  },

  dropdown: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 16,
    color: "#1E293B",
  },

  suggestionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    maxHeight: 150,
  },
  suggestionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  suggestionText: {
    fontSize: 14,
    color: "#334155",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: "100%",
    maxWidth: 340,
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalOptionSelected: {
    backgroundColor: "#EEF2FF",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#334155",
  },
  modalOptionTextSelected: {
    color: "#3F51B5",
    fontWeight: "500",
  },
  checkmark: {
    fontSize: 16,
    color: "#3F51B5",
    fontWeight: "500",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: "#F8FAFC",
  },
  saveButton: {
    backgroundColor: "#3F51B5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
