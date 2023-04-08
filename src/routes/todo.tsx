import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

type Todo = {
    id: string;
    title: string;
    description: string;
    done: boolean;
};

export default function Todo() {
    let todoId = 0;
    const [todos, setTodos] = createSignal<Todo[]>([]);
    const [title, setTitle] = createSignal("");
    let input: HTMLInputElement | undefined = undefined;

    return (
        <div class="flex flex-col">
            <div class="flex">
                <input
                    ref={input}
                    class="flex-1 block border"
                    value={title()}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <button
                    class="border px-10 py-2"
                    onClick={() => {
                        if (title() === "") return;
                        setTodos((todos) =>
                            todos.concat({
                                id: (++todoId).toString(),
                                title: title(),
                                description: "",
                                done: false,
                            })
                        );
                        setTitle("");
                        input!.focus();
                    }}>
                    添加
                </button>
            </div>
            <ul>
                <For each={todos()}>
                    {(todo) => {
                        console.log("recreate element", todo);
                        return (
                            <>
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={(e) => {
                                        setTodos((prev) =>
                                            prev.map((prev) => {
                                                if (prev.id === todo.id) {
                                                    return {
                                                        ...prev,
                                                        done: false,
                                                    };
                                                }
                                                return prev;
                                            })
                                        );
                                        //setTodos(todo => todo.id === id, "done", false);
                                    }}
                                />
                                <li class="bg-slate-600 text-gray-200 border rounded-sm px-5 py-2">{todo.title}</li>
                            </>
                        );
                    }}
                </For>
            </ul>
        </div>
    );
}
