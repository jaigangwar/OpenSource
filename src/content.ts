export interface SkillSnippet {
    text: string;
    explanation: string;
}

export const SKILL_DATA: Record<string, SkillSnippet[]> = {
    "Python": [
        { text: "x = 5", explanation: "Basic variable assignment in Python." },
        { text: "def get_sum(a, b):\n    return a + b", explanation: "Functions are defined using the 'def' keyword." },
        { text: "numbers = [x**2 for x in range(10)]", explanation: "List comprehensions offer a concise way to create lists." },
        { text: "import os\nprint(os.getcwd())", explanation: "The 'os' module provides functions for interacting with the OS." },
        { text: "with open('file.txt', 'r') as f:\n    data = f.read()", explanation: "The 'with' statement ensures proper resource management." },
        { text: "class Robot:\n    def __init__(self, name):\n        self.name = name", explanation: "Classes define blueprints for objects in OOP." },
        { text: "x = lambda a, b: a * b\nprint(x(5, 6))", explanation: "Lambda functions are small, anonymous inline functions." },
        { text: "try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print('Error')", explanation: "Try-except blocks handle runtime errors." },
        { text: "def decorator(func):\n    return func", explanation: "Decorators wrap a function to extend its behavior." },
        { text: "my_dict = {'key': 'value'}\nmy_dict.get('key')", explanation: "Dictionaries store key-value pairs; .get() avoids KeyError." }
    ],
    "React": [
        { text: "const UI = () => <div />", explanation: "Arrow functions provide a clean syntax for functional components." },
        { text: "const [count, setCount] = useState(0);", explanation: "useState is a Hook that adds local state to functional components." },
        { text: "useEffect(() => {\n    fetchData();\n}, []);", explanation: "useEffect performs side effects, like data fetching, after render." },
        { text: "<MyComponent prop={value} />", explanation: "Components are reusable, isolated building blocks of a React UI." },
        { text: "const memoizedValue = useMemo(() =>\n    compute(a, b), [a, b]);", explanation: "useMemo caches expensive calculations between renders." },
        { text: "export const Context = React.createContext();", explanation: "Context provides a way to pass data through the component tree." },
        { text: "const inputRef = useRef(null);", explanation: "useRef creates a mutable object that persists across renders." },
        { text: "const handleBtn = useCallback(() => {\n    action();\n}, []);", explanation: "useCallback memoizes a function definition to prevent re-renders." },
        { text: "return (\n    <React.Fragment>\n        <Child />\n    </React.Fragment>\n);", explanation: "Fragments group elements without adding extra DOM nodes." },
        { text: "const LazyComp = React.lazy(() => import('./LazyComp'));", explanation: "React.lazy enables dynamic code splitting and lazy loading of components." }
    ],
    "SQL": [
        { text: "SELECT * FROM users", explanation: "The SELECT statement retrieves data from a database." },
        { text: "INSERT INTO logs (event, time)\nVALUES ('login', NOW());", explanation: "INSERT is used to add new records." },
        { text: "UPDATE profile\nSET bio = 'Zen Master'\nWHERE id = 42;", explanation: "UPDATE modifies existing records in a table." },
        { text: "DELETE FROM sessions\nWHERE expired = true;", explanation: "DELETE removes records from a database table." },
        { text: "SELECT COUNT(id), role\nFROM users GROUP BY role;", explanation: "GROUP BY aggregates data based on specific columns." },
        { text: "SELECT a.name, b.salary\nFROM emp a JOIN pay b ON a.id = b.id;", explanation: "JOIN combines rows from two or more tables." },
        { text: "CREATE TABLE users (\n    id INT PRIMARY KEY\n);", explanation: "CREATE TABLE defines a new table structure." },
        { text: "ALTER TABLE users\nADD COLUMN email VARCHAR(255);", explanation: "ALTER TABLE changes an existing table schema." },
        { text: "SELECT name FROM users\nORDER BY created_at DESC LIMIT 10;", explanation: "ORDER BY sorts the result, LIMIT restricts the row count." },
        { text: "BEGIN;\nUPDATE accounts SET bal = 0;\nCOMMIT;", explanation: "Transactions ensure multiple operations succeed or fail together." }
    ],
    "TypeScript": [
        { text: "let age: number = 25;", explanation: "Basic type annotation in TypeScript." },
        { text: "interface User {\n    id: number;\n    name: string;\n}", explanation: "Interfaces define the shape and types of an object." },
        { text: "function log<T>(arg: T): T {\n    return arg;\n}", explanation: "Generics allow writing reusable, type-safe functions." },
        { text: "type Status = 'pending' | 'active' | 'done';", explanation: "Union types restrict a value to a specific set of strings or types." },
        { text: "class Point {\n    constructor(public x: number) {}\n}", explanation: "TS allows shorthand property initialization in constructors." },
        { text: "let value: unknown;\nif (typeof value === 'string') {}", explanation: "Type guards narrow down the type of a variable within a block." },
        { text: "const ids: number[] = [1, 2, 3];", explanation: "Type annotations define the expected data type of an array." },
        { text: "function print(msg?: string) {}", explanation: "The '?' marks a parameter or property as optional." },
        { text: "type ReadonlyUser = Readonly<User>;", explanation: "Utility types like Readonly modify existing types globally." },
        { text: "const user = obj as User;", explanation: "Type assertions override the compiler's inferred type." }
    ],
    "Java": [
        { text: "int x = 10;", explanation: "Variable declaration in Java." },
        { text: "public class Main {\n    public static void main(String[] args) {}\n}", explanation: "Every Java application begins with a main method." },
        { text: "ArrayList<String> list = new ArrayList<>();", explanation: "ArrayList is a dynamic array implementation in Java." },
        { text: "try {\n    doWork();\n} catch (Exception e) {\n    e.printStackTrace();\n}", explanation: "Try-catch blocks handle runtime exceptions gracefully." },
        { text: "public interface Animal {\n    void makeSound();\n}", explanation: "Interfaces define abstract methods for classes to implement." },
        { text: "Stream<String> s = list.stream()\n    .filter(x -> x.startsWith(\"a\"));", explanation: "Streams provide functional-style operations on collections." },
        { text: "String[] arr = new String[5];", explanation: "Arrays in Java have a fixed size upon initialization." },
        { text: "public static final double PI = 3.14159;", explanation: "static final creates a class-level constant." },
        { text: "Thread t = new Thread(() -> runTask());\nt.start();", explanation: "Threads allow concurrent execution of code." },
        { text: "public MyClass() {\n    this.value = 1;\n}", explanation: "Constructors initialize newly created objects." }
    ],
    "HTML/CSS": [
        { text: "<p>Hello</p>", explanation: "Paragraph tags contain text." },
        { text: "<div class='container'>\n    <p>Focus!</p>\n</div>", explanation: "HTML tags define the semantic structure of a webpage." },
        { text: ".neon {\n    color: #00f3ff;\n    text-shadow: 0 0 10px;\n}", explanation: "CSS selectors apply visual styles to HTML elements." },
        { text: "@media (max-width: 600px) {\n    body { padding: 10px; }\n}", explanation: "Media queries enable responsive design for mobile devices." },
        { text: "display: grid;\ngrid-template-columns: 1fr 1fr;", explanation: "CSS Grid is a powerful 2D layout system." },
        { text: "display: flex;\njustify-content: center;\nalign-items: center;", explanation: "Flexbox aligns and distributes space among items in a container." },
        { text: "box-sizing: border-box;", explanation: "border-box includes padding and border in the element's total width." },
        { text: "position: absolute;\ntop: 50%;\ntransform: translateY(-50%);", explanation: "Absolute positioning places an element relative to its closest positioned ancestor." },
        { text: "transition: all 0.3s ease-in-out;", explanation: "Transitions provide smooth animations for property changes." },
        { text: "<meta name=\"viewport\" content=\"width=device-width\" />", explanation: "The viewport meta tag ensures proper scaling on mobile devices." }
    ]
};

// Fallback for remaining subjects
const fallbackSubjects = ["C++", "Rust", "Go", "Node.js", "Linux Bash", "Docker", "Git", "CyberSecurity", "Machine Learning", "Data Science", "Regex", "Quantum Computing", "Astronomy", "Tech Trivia"];

fallbackSubjects.forEach(sub => {
    if(!SKILL_DATA[sub]) {
        SKILL_DATA[sub] = [
            { text: `Init ${sub}`, explanation: "System starting." },
            { text: `Welcome to ${sub} training.`, explanation: `Initializing ${sub} neural patterns...` },
            { text: "Focus your mind.", explanation: "High focus yields optimal learning rates." },
            { text: "Maintain the flow state.", explanation: "Errors break the cognitive sync." },
            { text: "Almost complete.", explanation: "Your WPM is directly tied to clarity." },
            { text: "Knowledge acquired.", explanation: "System updating with new patterns." }
        ];
    }
});

// Helper for Custom Data Injector
export function parseCustomData(rawData: string): SkillSnippet[] {
    const lines = rawData.split('\n').filter(line => line.trim().length > 0);
    const snippets: SkillSnippet[] = [];
    
    // Group lines into small blocks (e.g. 1 or 2 lines)
    for (let i = 0; i < lines.length; i += 2) {
        let text = lines[i];
        if (i + 1 < lines.length) {
            text += '\n' + lines[i+1];
        }
        snippets.push({
            text: text,
            explanation: "Custom Neural Input Acquired."
        });
    }

    if(snippets.length === 0) {
        snippets.push({ text: "Custom Data Error", explanation: "No valid text provided." });
    }

    return snippets;
}
