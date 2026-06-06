export interface SkillSnippet {
    text: string;
    explanation: string;
}

const p = (text: string, explanation: string) => ({ text, explanation });

export const SKILL_DATA: Record<string, SkillSnippet[]> = {
    "Python": [
        p("x = 5", "Variable assignment."),
        p("def add(a, b):\n    return a + b", "Function definition."),
        p("l = [x*x for x in range(5)]", "List comprehension."),
        p("import os\nos.getcwd()", "Importing modules."),
        p("class User:\n    pass", "Class definition."),
        p("try:\n    1/0\nexcept:\n    print('Err')", "Error handling."),
        p("with open('f.txt') as f:\n    pass", "Context manager."),
        p("is_valid = True if x > 0 else False", "Ternary operator."),
        p("lambda x: x + 1", "Lambda function."),
        p("print(f'Hello {name}')", "F-string formatting.")
    ],
    "React": [
        p("const App = () => <div />", "Functional component."),
        p("const [s, setS] = useState(0)", "State hook."),
        p("useEffect(() => {}, [])", "Effect hook."),
        p("<Child props={val} />", "Passing props."),
        p("const ref = useRef(null)", "Ref hook."),
        p("export default App", "Module export."),
        p("const memo = useMemo(() => compute(), [])", "Memoization."),
        p("return (\n    <>\n        <Nav />\n    </>\n)", "JSX Fragments."),
        p("const ctx = createContext()", "Context API."),
        p("const callback = useCallback(() => {}, [])", "Callback hook.")
    ],
    "SQL": [
        p("SELECT * FROM users", "Retrieving data."),
        p("INSERT INTO logs VALUES (1)", "Adding records."),
        p("UPDATE users SET name='Zen'", "Modifying data."),
        p("DELETE FROM sessions", "Removing data."),
        p("SELECT count(*) FROM emp", "Aggregation."),
        p("GROUP BY department", "Grouping data."),
        p("JOIN roles ON u.id = r.id", "Table joins."),
        p("ORDER BY date DESC", "Sorting results."),
        p("CREATE TABLE test (id INT)", "Schema creation."),
        p("BEGIN; ROLLBACK;", "Transactions.")
    ],
    "TypeScript": [
        p("let n: number = 1", "Type annotation."),
        p("interface User { id: id }", "Interfaces."),
        p("type Status = 'ok' | 'err'", "Union types."),
        p("function log<T>(a: T): T", "Generics."),
        p("enum Color { Red, Blue }", "Enums."),
        p("const x = val as string", "Type assertion."),
        p("readonly name: string", "Readonly modifier."),
        p("namespace App { }", "Namespaces."),
        p("Pick<User, 'id'>", "Utility types."),
        p("abstract class Base { }", "Abstract classes.")
    ],
    "Java": [
        p("public class Main { }", "Class structure."),
        p("int[] arr = new int[5]", "Arrays."),
        p("ArrayList<String> l = new ArrayList<>()", "Collections."),
        p("System.out.println('Hi')", "Standard output."),
        p("public static void main", "Main method."),
        p("interface Animal { }", "Interfaces."),
        p("try { } catch (Exception e)", "Exceptions."),
        p("@Override", "Annotations."),
        p("Thread t = new Thread()", "Multithreading."),
        p("Map<K, V> m = new HashMap<>()", "Hash maps.")
    ],
    "HTML/CSS": [
        p("<div class='box'></div>", "HTML elements."),
        p(".box { color: red; }", "CSS selectors."),
        p("display: flex;", "Flexbox."),
        p("grid-template-columns: 1fr", "CSS Grid."),
        p("@media (max-width: 600px)", "Media queries."),
        p("position: relative;", "Positioning."),
        p("box-sizing: border-box;", "Box model."),
        p("animation: fade 1s;", "Animations."),
        p("<meta name='viewport' content='...'>", "Viewport settings."),
        p("opacity: 0.5;", "Transparency.")
    ],
    "C++": [
        p("#include <iostream>", "Headers."),
        p("int main() { return 0; }", "Entry point."),
        p("std::vector<int> v;", "Vectors."),
        p("int* p = &x;", "Pointers."),
        p("class MyClass { public: };", "Classes."),
        p("cout << 'Hello' << endl;", "I/O stream."),
        p("template <typename T>", "Templates."),
        p("namespace fs = std::filesystem;", "Namespaces."),
        p("auto lambda = [](){};", "Lambdas."),
        p("throw std::runtime_error('');", "Exceptions.")
    ],
    "Rust": [
        p("fn main() { }", "Main function."),
        p("let mut x = 5;", "Mutability."),
        p("println!('Hello');", "Macros."),
        p("match val { 1 => (), _ => () }", "Pattern matching."),
        p("let v = vec![1, 2, 3];", "Vectors."),
        p("struct User { name: String }", "Structs."),
        p("impl User { fn new() {} }", "Implementations."),
        p("enum Result<T, E> { }", "Enums."),
        p("pub use self::module;", "Visibility."),
        p("unwrap_or_default()", "Option handling.")
    ],
    "Go": [
        p("package main", "Package declaration."),
        p("import 'fmt'", "Imports."),
        p("func main() { }", "Functions."),
        p("go doWork()", "Goroutines."),
        p("ch := make(chan int)", "Channels."),
        p("if err != nil { }", "Error checking."),
        p("type User struct { }", "Structs."),
        p("defer close(f)", "Deferred calls."),
        p("slice := []int{1, 2}", "Slices."),
        p("map[string]int", "Maps.")
    ],
    "Node.js": [
        p("require('fs')", "CommonJS."),
        p("module.exports = { }", "Exports."),
        p("process.env.PORT", "Environment."),
        p("app.get('/', (q, r) => {})", "Routing."),
        p("next()", "Middleware."),
        p("Buffer.from('hi')", "Buffers."),
        p("EventEmitter", "Events."),
        p("Stream", "Streams."),
        p("npm install", "Package management."),
        p("path.join(__dirname, 'f')", "Path handling.")
    ],
    "Linux Bash": [
        p("chmod +x script.sh", "Permissions."),
        p("ls -la | grep '.ts'", "Piping."),
        p("export PATH=$PATH:/dir", "Environment."),
        p("find . -name '*.js'", "Searching."),
        p("alias gs='git status'", "Aliases."),
        p("if [ -f file ]; then", "Conditionals."),
        p("tar -czf arch.tar.gz .", "Archiving."),
        p("curl -X GET url", "Networking."),
        p("sudo apt update", "Package manager."),
        p("cat /etc/passwd", "Reading files.")
    ],
    "Docker": [
        p("FROM node:alpine", "Base images."),
        p("WORKDIR /app", "Working dir."),
        p("COPY . .", "Copying files."),
        p("RUN npm install", "Build steps."),
        p("CMD ['npm', 'start']", "Runtime command."),
        p("EXPOSE 3000", "Ports."),
        p("ENV NODE_ENV=prod", "Env vars."),
        p("docker build -t img .", "Building."),
        p("docker-compose up", "Orchestration."),
        p("docker ps", "Status.")
    ],
    "Git": [
        p("git init", "Initialization."),
        p("git add .", "Staging."),
        p("git commit -m 'msg'", "Committing."),
        p("git push origin main", "Pushing."),
        p("git checkout -b branch", "Branching."),
        p("git merge main", "Merging."),
        p("git rebase main", "Rebase."),
        p("git pull --rebase", "Pulling."),
        p("git stash pop", "Stashing."),
        p("git log --oneline", "History.")
    ],
    "CyberSecurity": [
        p("<script>alert(1)</script>", "XSS."),
        p("' OR '1'='1", "SQL Injection."),
        p("bcrypt.hash(pwd, 10)", "Hashing."),
        p("nmap -sS target", "Port scanning."),
        p("JWT token validation", "Authentication."),
        p("Same-Origin Policy", "Web security."),
        p("CSRF tokens", "Request forgery."),
        p("Salting passwords", "Entropy."),
        p("SSL/TLS handshake", "Encryption."),
        p("Broken Access Control", "OWASP Top 10.")
    ],
    "Machine Learning": [
        p("model.fit(X, y)", "Training."),
        p("Dense(64, activation='relu')", "Layers."),
        p("optimizer='adam'", "Optimization."),
        p("Epochs", "Iterations."),
        p("Loss function", "Objective."),
        p("Overfitting", "Generalization."),
        p("Linear Regression", "Regression."),
        p("Decision Trees", "Classification."),
        p("Neural Networks", "Deep learning."),
        p("K-Means", "Clustering.")
    ],
    "Data Science": [
        p("df.head()", "Data frames."),
        p("pd.read_csv('f.csv')", "Data loading."),
        p("df.dropna()", "Cleaning."),
        p("plt.plot(x, y)", "Visualization."),
        p("StandardScaler()", "Scaling."),
        p("Train-test split", "Validation."),
        p("Correlation matrix", "Statistics."),
        p("P-value", "Hypothesis testing."),
        p("Outliers", "Anomalies."),
        p("Mean, Median, Mode", "Central tendency.")
    ],
    "Regex": [
        p("/^[a-z]+$/", "Start/End."),
        p("/\\d{3}/", "Digits."),
        p("/\\s+/", "Whitespace."),
        p("/(abc|def)/", "Grouping."),
        p("/[^0-9]/", "Negation."),
        p("/[a-zA-Z]/", "Ranges."),
        p("/\\w+/", "Word characters."),
        p("/(.)\\1/", "Backreferences."),
        p("/(?=.*[A-Z])/", "Lookahead."),
        p("/[a-z]+/gi", "Flags.")
    ],
    "Quantum Computing": [
        p("qc = QuantumCircuit(2)", "Circuits."),
        p("qc.h(0)", "Superposition."),
        p("qc.cx(0, 1)", "Entanglement."),
        p("qc.measure_all()", "Measurement."),
        p("Qubit", "Quantum bit."),
        p("Bloch Sphere", "Visualization."),
        p("Quantum Gates", "Operations."),
        p("Superposition", "Linear combo."),
        p("Interference", "Wave property."),
        p("Algorithms (Shor/Grover)", "Quantum speedup.")
    ],
    "Astronomy": [
        p("E = mc^2", "Relativity."),
        p("Light year", "Distance."),
        p("Black hole", "Singularity."),
        p("Redshift", "Cosmology."),
        p("Exoplanets", "Planetary systems."),
        p("Milky Way", "Galaxies."),
        p("Supernova", "Star death."),
        p("Dark Matter", "Invisible mass."),
        p("Nebula", "Gas clouds."),
        p("Event Horizon", "Boundary.")
    ],
    "Tech Trivia": [
        p("First bug was a moth.", "History."),
        p("1024 bytes = 1 KB", "Units."),
        p("CERN web 1991", "Internet."),
        p("Viking King Bluetooth", "Etymology."),
        p("First mouse was wood.", "Hardware."),
        p("Python 1991", "Origins."),
        p("ASCII characters", "Encoding."),
        p("Moore's Law", "Transistors."),
        p("Ada Lovelace", "First programmer."),
        p("Eniac", "First computer.")
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
