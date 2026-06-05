export interface SkillSnippet {
    text: string;
    explanation: string;
}

export const SKILL_DATA: Record<string, SkillSnippet[]> = {
    Python: [
        { text: "def calculate_sum(a, b): return a + b", explanation: "Functions are defined using the 'def' keyword." },
        { text: "numbers = [x**2 for x in range(10)]", explanation: "List comprehensions offer a concise way to create lists." },
        { text: "import os; print(os.getcwd())", explanation: "The 'os' module provides functions for interacting with the OS." }
    ],
    SQL: [
        { text: "SELECT * FROM users WHERE active = 1;", explanation: "The SELECT statement retrieves data from a database." },
        { text: "INSERT INTO logs (event, time) VALUES ('login', NOW());", explanation: "INSERT is used to add new records." },
        { text: "UPDATE profile SET bio = 'Zen Master' WHERE id = 42;", explanation: "UPDATE modifies existing records in a table." }
    ],
    Java: [
        { text: "public class Main { public static void main(String[] args) {} }", explanation: "Every Java app starts with a main method inside a class." },
        { text: "ArrayList<String> list = new ArrayList<>();", explanation: "ArrayList is a dynamic array implementation." },
        { text: "try { ... } catch (Exception e) { e.printStackTrace(); }", explanation: "Try-catch blocks are used for exception handling." }
    ],
    "HTML/CSS": [
        { text: "<div class='container'> <p>Focus!</p> </div>", explanation: "HTML tags define the structure of the web page." },
        { text: ".neon { color: #00f3ff; text-shadow: 0 0 10px; }", explanation: "CSS selectors apply styles to HTML elements." },
        { text: "@media (max-width: 600px) { body { padding: 10px; } }", explanation: "Media queries are used for responsive design." }
    ],
    React: [
        { text: "const [count, setCount] = useState(0);", explanation: "useState is a Hook that adds state to functional components." },
        { text: "useEffect(() => { fetchData(); }, []);", explanation: "useEffect runs code after the component renders." },
        { text: "<MyComponent prop={value} />", explanation: "Components are reusable building blocks in React." }
    ]
};
