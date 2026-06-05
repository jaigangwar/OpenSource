export interface SkillSnippet {
    text: string;
    explanation: string;
}

export const SKILL_DATA: Record<string, SkillSnippet[]> = {
    "Python": [
        { text: "def calculate_sum(a, b): return a + b", explanation: "Functions are defined using the 'def' keyword in Python." },
        { text: "numbers = [x**2 for x in range(10)]", explanation: "List comprehensions offer a concise way to create lists." },
        { text: "import os; print(os.getcwd())", explanation: "The 'os' module provides functions for interacting with the OS." }
    ],
    "SQL": [
        { text: "SELECT * FROM users WHERE active = 1;", explanation: "The SELECT statement retrieves data from a database." },
        { text: "INSERT INTO logs (event, time) VALUES ('login', NOW());", explanation: "INSERT is used to add new records." },
        { text: "UPDATE profile SET bio = 'Zen Master' WHERE id = 42;", explanation: "UPDATE modifies existing records in a table." }
    ],
    "Java": [
        { text: "public class Main { public static void main(String[] args) {} }", explanation: "Every Java application begins with a main method." },
        { text: "ArrayList<String> list = new ArrayList<>();", explanation: "ArrayList is a dynamic array implementation in Java." },
        { text: "try { ... } catch (Exception e) { e.printStackTrace(); }", explanation: "Try-catch blocks handle runtime exceptions gracefully." }
    ],
    "HTML/CSS": [
        { text: "<div class='container'> <p>Focus!</p> </div>", explanation: "HTML tags define the semantic structure of a webpage." },
        { text: ".neon { color: #00f3ff; text-shadow: 0 0 10px; }", explanation: "CSS selectors apply visual styles to HTML elements." },
        { text: "@media (max-width: 600px) { body { padding: 10px; } }", explanation: "Media queries enable responsive design for mobile devices." }
    ],
    "React": [
        { text: "const [count, setCount] = useState(0);", explanation: "useState is a Hook that adds local state to functional components." },
        { text: "useEffect(() => { fetchData(); }, []);", explanation: "useEffect performs side effects, like data fetching, after render." },
        { text: "<MyComponent prop={value} />", explanation: "Components are reusable, isolated building blocks of a React UI." }
    ],
    "TypeScript": [
        { text: "interface User { id: number; name: string; }", explanation: "Interfaces define the shape and types of an object." },
        { text: "function log<T>(arg: T): T { return arg; }", explanation: "Generics allow writing reusable, type-safe functions." },
        { text: "type Status = 'pending' | 'active' | 'done';", explanation: "Union types restrict a value to a specific set of strings or types." }
    ],
    "C++": [
        { text: "#include <iostream>\nusing namespace std;", explanation: "The iostream library handles standard input and output in C++." },
        { text: "int* ptr = &variable;", explanation: "Pointers store the memory address of another variable." },
        { text: "std::vector<int> v = {1, 2, 3};", explanation: "Vectors are sequence containers representing dynamic arrays." }
    ],
    "Rust": [
        { text: "fn main() { println!(\"Hello, world!\"); }", explanation: "The main function is the entry point, and println! is a macro." },
        { text: "let mut x = 5;", explanation: "Variables in Rust are immutable by default; 'mut' makes them mutable." },
        { text: "match variable { 1 => do_one(), _ => do_other() }", explanation: "Pattern matching is a powerful control flow operator in Rust." }
    ],
    "Go": [
        { text: "package main\nimport \"fmt\"", explanation: "Go programs are organized into packages; 'fmt' formats I/O." },
        { text: "func calculate() (int, error) { return 42, nil }", explanation: "Go functions can return multiple values, often including an error." },
        { text: "go processData(data)", explanation: "The 'go' keyword spawns a new lightweight thread known as a goroutine." }
    ],
    "Node.js": [
        { text: "const fs = require('fs');", explanation: "The 'require' function imports built-in or external Node modules." },
        { text: "app.get('/api/data', (req, res) => res.json(data));", explanation: "Express.js simplifies creating HTTP API endpoints in Node." },
        { text: "process.env.PORT || 3000;", explanation: "Environment variables configure the app without changing the code." }
    ],
    "Linux Bash": [
        { text: "chmod +x script.sh", explanation: "The chmod command modifies file permissions; '+x' grants execution rights." },
        { text: "grep -r \"pattern\" /var/logs/", explanation: "Grep recursively searches for a text pattern within directories." },
        { text: "ls -la | grep \".ts\"", explanation: "Piping '|' takes the output of one command and feeds it to another." }
    ],
    "Docker": [
        { text: "FROM node:18-alpine", explanation: "The FROM instruction sets the base image for your Docker container." },
        { text: "docker build -t my-app .", explanation: "Builds a new Docker image from the Dockerfile in the current directory." },
        { text: "docker-compose up -d", explanation: "Starts multiple interconnected containers in detached mode." }
    ],
    "Git": [
        { text: "git commit -m \"feat: add neural engine\"", explanation: "Commits staged changes to the local repository history." },
        { text: "git checkout -b new-feature", explanation: "Creates a new branch and switches to it simultaneously." },
        { text: "git rebase main", explanation: "Rebase rewrites your branch history to sit on top of the main branch." }
    ],
    "CyberSecurity": [
        { text: "XSS: <script>alert(document.cookie)</script>", explanation: "Cross-Site Scripting (XSS) injects malicious scripts into webpages." },
        { text: "SQLi: ' OR '1'='1", explanation: "SQL Injection manipulates backend databases via unsanitized inputs." },
        { text: "bcrypt.hash(password, 10);", explanation: "Salting and hashing passwords protects them even if the database is breached." }
    ],
    "Machine Learning": [
        { text: "model.fit(X_train, y_train, epochs=10)", explanation: "The fit method trains the neural network on the provided dataset." },
        { text: "loss = tf.keras.losses.MeanSquaredError()", explanation: "Loss functions measure how far off the model's predictions are." },
        { text: "import numpy as np; np.dot(A, B)", explanation: "NumPy performs highly optimized matrix and vector operations." }
    ],
    "Data Science": [
        { text: "df = pd.read_csv('data.csv')", explanation: "Pandas DataFrames are powerful structures for data manipulation." },
        { text: "df.dropna(inplace=True)", explanation: "Data cleaning often involves dropping rows with missing or null values." },
        { text: "plt.plot(x, y); plt.show()", explanation: "Matplotlib visualizes data trends using various chart types." }
    ],
    "Regex": [
        { text: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", explanation: "Regular expressions define search patterns, here matching an email." },
        { text: "\\d{3}-\\d{2}-\\d{4}", explanation: "Matches a standard US Social Security Number format using digit classes." },
        { text: "text.replace(/\\s+/g, ' ')", explanation: "Regex is used in JS to globally replace multiple spaces with a single space." }
    ],
    "Quantum Computing": [
        { text: "qc = QuantumCircuit(2, 2)", explanation: "Initializes a quantum circuit with 2 qubits and 2 classical bits." },
        { text: "qc.h(0)", explanation: "Applies a Hadamard gate, placing the qubit into a state of superposition." },
        { text: "qc.cx(0, 1)", explanation: "A CNOT gate creates quantum entanglement between two target qubits." }
    ],
    "Astronomy": [
        { text: "E = mc^2", explanation: "Mass-energy equivalence states that mass can be converted into massive amounts of energy." },
        { text: "v = H0 * d", explanation: "Hubble's Law: The velocity at which a galaxy moves away is proportional to its distance." },
        { text: "Schwarzschild radius: r = 2GM/c^2", explanation: "The radius defining the event horizon of a black hole." }
    ],
    "Tech Trivia": [
        { text: "The first computer bug was an actual moth.", explanation: "Grace Hopper found a moth in the Harvard Mark II in 1947." },
        { text: "1024 bytes = 1 Kilobyte.", explanation: "Computers use binary math, making powers of 2 the standard for storage." },
        { text: "The first website went live in 1991.", explanation: "Created by Tim Berners-Lee at CERN, explaining the World Wide Web project." }
    ]
};