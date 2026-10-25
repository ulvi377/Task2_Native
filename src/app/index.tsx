import { useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (task.trim() === "") {
      Alert.alert("Diqqət", "Zəhmət olmasa tapşırıq daxil edin!");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    Keyboard.dismiss();
  };

  const handleCompleteTask = (id: string) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completedTasks = tasks.filter((item) => item.completed).length;

  return (
    <View style={[styles.container, { paddingTop: StatusBar.currentHeight || 20 }]}>
      <View style={styles.header}>
        <Text style={styles.label}>MY DAILY PLANNER</Text>
        <Text style={styles.title}>ToDoList</Text>
        <Text style={styles.subtitle}>Planla, tamamla, irəli get.</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Yeni tapşırıq yaz..."
          placeholderTextColor="#8993A4"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <MaterialCommunityIcons name="plus" size={27} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View>
          <Text style={styles.listTitle}>Tapşırıqlarım</Text>
          <Text style={styles.summaryText}>
            {completedTasks} / {tasks.length} tamamlanıb
          </Text>
        </View>
        <View style={styles.numberBox}>
          <Text style={styles.numberText}>{tasks.length}</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tasks.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={38}
                color="#8290A5"
              />
            </View>
            <Text style={styles.emptyTitle}>Hələ tapşırıq yoxdur</Text>
            <Text style={styles.emptyText}>
              İlk tapşırığını əlavə et və gününü planlaşdır.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => handleCompleteTask(item.id)}
            >
              <MaterialCommunityIcons
                name={item.completed ? "check-circle" : "checkbox-blank-circle-outline"}
                size={25}
                color={item.completed ? "#22A06B" : "#98A2B3"}
              />
            </TouchableOpacity>

            <Text
              style={[styles.taskText, item.completed && styles.completedTask]}
            >
              {item.title}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={22}
                color="#E05252"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.footer}>Kiçik addımlar böyük nəticələr yaradır.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    marginTop: 24,
    marginBottom: 26,
  },
  label: {
    color: "#5369D8",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 10,
  },
  title: {
    color: "#182238",
    fontSize: 34,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#7B8495",
    fontSize: 15,
    marginTop: 7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  input: {
    flex: 1,
    height: 54,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E9F2",
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#182238",
    fontSize: 15,
  },
  addButton: {
    width: 54,
    height: 54,
    marginLeft: 10,
    borderRadius: 14,
    backgroundColor: "#5369D8",
    justifyContent: "center",
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  listTitle: {
    color: "#202B40",
    fontSize: 20,
    fontWeight: "bold",
  },
  summaryText: {
    color: "#8993A4",
    fontSize: 13,
    marginTop: 5,
  },
  numberBox: {
    minWidth: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E7EBFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  numberText: {
    color: "#5369D8",
    fontSize: 15,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  emptyIcon: {
    width: 78,
    height: 78,
    borderRadius: 25,
    backgroundColor: "#E9EDF7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyTitle: {
    color: "#273248",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyText: {
    color: "#8A94A6",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 13,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#EDF0F6",
  },
  checkButton: {
    marginRight: 11,
  },
  taskText: {
    flex: 1,
    color: "#273248",
    fontSize: 15,
    lineHeight: 21,
  },
  completedTask: {
    color: "#9AA3B2",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 4,
  },
  footer: {
    color: "#A0A8B6",
    fontSize: 12,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 18,
  },
});
