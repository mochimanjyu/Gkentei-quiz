import { useState } from "react";

export default function クイズ() {
  const 質問リスト = [
    {
      質問: "AIの学習で使われるデータを何と呼ぶ？",
      選択肢: ["プロンプト", "モデル", "パラメータ", "データセット"],
      正解番号: 4,
      解説: "学習時に使われるデータは一般に「データセット」と呼ばれます。"
    },
    {
      質問: "G検定で扱われる内容に最も関連が深いのは？",
      選択肢: ["ネットワークセキュリティ", "ディープラーニング", "IoTデバイス設計", "UXデザイン"],
      正解番号: 2,
      解説: "G検定では主にディープラーニングなどのAI技術が出題されます。"
    },
    {
      質問: "AIの判断に使われる関数で、入力を出力に変換する役割をもつのは？",
      選択肢: ["活性化関数", "損失関数", "最適化関数", "重み関数"],
      正解番号: 1,
      解説: "活性化関数は、入力された値を出力に変換する役割を果たします。"
    }
  ];

  const [現在の番号, 番号を更新] = useState(0);
  const [選択済み, 選択を更新] = useState(null);
  const [解答表示中, 解答表示を更新] = useState(false);
  const [スコア, スコアを更新] = useState(0);
  const [終了, 終了を更新] = useState(false);
  const [間違いリスト, 間違いを更新] = useState([]);
  const [復習モード, モードを更新] = useState(false);
  const [復習スタート, 復習スタート更新] = useState(false);

  const 回答処理 = (インデックス) => {
    選択を更新(インデックス);
    解答表示を更新(true);
    if (インデックス === 現在の質問.正解番号 - 1) {
      スコアを更新((前) => 前 + 1);
    } else {
      間違いを更新((前) => [...前, 質問リスト[現在の番号]]);
    }
  };

  const 次の質問 = () => {
    const 現在のリスト = 復習モード ? 間違いリスト : 質問リスト;
    if (現在の番号 < 現在のリスト.length - 1) {
      番号を更新((前) => 前 + 1);
      選択を更新(null);
      解答表示を更新(false);
    } else {
      終了を更新(true);
    }
  };

  const 復習を開始 = () => {
    if (間違いリスト.length > 0) {
      番号を更新(0);
      選択を更新(null);
      解答表示を更新(false);
      スコアを更新(0);
      モードを更新(true);
      終了を更新(false);
      復習スタート更新(true);
    }
  };

  const 現在の質問 = 復習モード ? 間違いリスト[現在の番号] : 質問リスト[現在の番号];

  return (
    <div className="p-4 max-w-md mx-auto">
      {!終了 ? (
        <>
          <h1 className="text-xl font-bold mb-4">
            {復習モード ? "復習モード 第" + (現在の番号 + 1) + "問" : "第" + (現在の番号 + 1) + "問"}
          </h1>
          <p className="mb-4">{現在の質問.質問}</p>
          <ul className="space-y-2">
            {現在の質問.選択肢.map((選択肢テキスト, インデックス) => (
              <li key={インデックス}>
                <button
                  onClick={() => 回答処理(インデックス)}
                  className="w-full text-left border px-3 py-2 rounded hover:bg-gray-100"
                >
                  {インデックス + 1}. {選択肢テキスト}
                </button>
              </li>
            ))}
          </ul>

          {解答表示中 && (
            <div className="mt-4 p-3 border-t">
              <p>
                <strong>正解：</strong> {現在の質問.正解番号}. {現在の質問.選択肢[現在の質問.正解番号 - 1]}
              </p>
              <p className="mt-2 text-sm text-gray-700">{現在の質問.解説}</p>
              <button
                onClick={次の質問}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                次の問題へ
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">クイズ終了！</h2>
          <p className="mt-4 text-lg">あなたのスコアは {スコア} / {(復習モード ? 間違いリスト.length : 質問リスト.length)} です。</p>
          {!復習モード && 間違いリスト.length > 0 && (
            <>
              <p className="mt-2 text-sm text-red-600">※間違えた問題があります。復習モードで再挑戦できます。</p>
              <button
                onClick={復習を開始}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                復習モードを開始
              </button>
            </>
          )}
          {復習モード && (
            <p className="mt-2 text-sm text-gray-600">復習モードも完了しました。おつかれさまでした！</p>
          )}
        </div>
      )}
    </div>
  );
}
