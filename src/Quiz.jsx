import { useState } from "react";

export default function Quiz() {
  const questions = [
    {
      question: "AIの学習で使われるデータを何と呼ぶ？",
      options: [
        "プロンプト",
        "モデル",
        "パラメータ",
        "データセット"
      ],
      answer: 4,
      explanation: "学習時に使われるデータは一般に「データセット」と呼ばれます。"
    },
    {
      question: "G検定で扱われる内容に最も関連が深いのは？",
      options: [
        "ネットワークセキュリティ",
        "ディープラーニング",
        "IoTデバイス設計",
        "UXデザイン"
      ],
      answer: 2,
      explanation: "G検定では主にディープラーニングなどのAI技術が出題されます。"
    },
    {
      question: "AIの判断に使われる関数で、入力を出力に変換する役割をもつのは？",
      options: [
        "活性化関数",
        "損失関数",
        "最適化関数",
        "重み関数"
      ],
      answer: 1,
      explanation: "活性化関数は、入力された値を出力に変換する役割を果たします。"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = (index) => {
    setSelected(index);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  };

  const currentQuestion = questions[current];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">第{current + 1}問</h1>
      <p className="mb-4">{currentQuestion.question}</p>
      <ul className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(index)}
              className="w-full text-left border px-3 py-2 rounded hover:bg-gray-100"
            >
              {index + 1}. {option}
            </button>
          </li>
        ))}
      </ul>

      {showAnswer && (
        <div className="mt-4 p-3 border-t">
          <p>
            <strong>正解：</strong> {currentQuestion.answer}. {currentQuestion.options[currentQuestion.answer - 1]}
          </p>
          <p className="mt-2 text-sm text-gray-700">{currentQuestion.explanation}</p>
          {current < questions.length - 1 && (
            <button
              onClick={nextQuestion}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              次の問題へ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
