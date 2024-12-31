import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import { BsTypeH2 } from "react-icons/bs";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";

// interface TipTapProps {
//   editorContent: string;
//   onChange: (content: string) => void;
// }

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ListItem,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold capitalize",
          levels: [2],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-2",
        },
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          " text-left shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
      },
    },
    content: `<ul class="list-disc ml-2"><li><p>Hello 12345632</p></li></ul>`,
    onUpdate: ({ editor, transaction }) => {
      console.log("transaction", transaction);
      transaction.steps.forEach((step) => {
        const jsonStep = step.toJSON();
        if (jsonStep.stepType === "replace") {
          console.log(
            "Replace",
            jsonStep.from,
            jsonStep.to,
            jsonStep.slice?.content[0]?.text
          );
        }
        // console.log("Step", step.toJSON());
      });

      // console.log(editor.getJSON());
      // console.log(editor.getHTML());
      // console.log(editor.getText());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col justify-stretch min-h-[200px] border rounded border-b-0">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
          title="Bold (Ctrl+B)"
        >
          <b>B</b>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
          title="Italic (Ctrl+I)"
        >
          <i>I</i>
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <BsTypeH2 />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
          title="Bullet List"
        >
          <MdFormatListBulleted />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
          title="Ordered List"
        >
          <MdFormatListNumbered />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
