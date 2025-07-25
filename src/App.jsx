
import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "ディープラーニングの学習時に使われる『損失関数』の主な役割はどれか？",
    options: [
      "学習データを自動生成すること",
      "モデルの重みを固定すること",
      "モデルの予測と正解のズレを数値化すること",
      "学習率を自動調整すること"
    ],
    answerIndex: 2,
    explanation: "損失関数は、モデルの出力と正解ラベルの差を数値化し、学習の進捗を評価するために使用されます。損失が小さいほど、予測が正確ということを意味します。"
  },
  {
    question: "バッチ学習とオンライン学習の違いについて正しいのはどれか？",
    options: [
      "バッチ学習は1件ずつ学習し、オンライン学習は大量データで一気に学習する",
      "オンライン学習は過学習が起こりにくいので常に優れている",
      "バッチ学習はまとめてデータを処理し、オンライン学習は逐次的に学習する",
      "両者の違いは出力層の構造にある"
    ],
    answerIndex: 2,
    explanation: "バッチ学習は一定量のデータをまとめて処理しますが、オンライン学習は新しいデータが届くたびに学習を更新します。"
  },
  {
    question: "活性化関数ReLUの特徴として適切なのはどれか？",
    options: [
      "入力値を常に1に変換する",
      "負の値を0にし、正の値はそのまま出力する",
      "入力値を指数関数で処理して正規化する",
      "すべての値をシグモイド関数で滑らかに変換する"
    ],
    answerIndex: 1,
    explanation: "ReLUは、0以下の入力を0に、0より大きい入力はそのまま出力します。計算が速く、深層学習でよく使われます。"
  }
];

export default function App() {
  const [selected, setSelected] = useState(Array(questions.length).fill(null));

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      {questions.map((q, idx) => (
        <div key={idx} className="border p-4 rounded-xl shadow">
          <p className="font-semibold mb-3">{`Q${idx + 1}. ${q.question}`}</p>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() =>
                  setSelected((s) => s.map((v, j) => (j === idx ? i : v)))
                }
                className={`block w-full text-left px-4 py-2 rounded-lg border ${
                  selected[idx] === i
                    ? i === q.answerIndex
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected[idx] !== null && (
            <div className="mt-3 text-sm text-gray-700">
              <strong>解説：</strong> {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
