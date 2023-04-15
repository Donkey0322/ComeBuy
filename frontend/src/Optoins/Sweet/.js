const sortBy = ["蜜", "糖"];
const secondSortBy = ["無", "1", "微", "半", "少", "正常", "多"];
const data = [
  "半蜜",
  "微糖",
  "少糖",
  "正常糖",
  "微蜜",
  "多蜜",
  "半糖",
  "無糖",
  "少蜜",
  "1分",
];

// console.log(data.sort((a, b) => sortBy.indexOf(a) - sortBy.indexOf(b)));

var arr = [
  { title: "50 - 50" },
  { title: "100 - 100" },
  { title: "50 - 65" },
  { title: "100 - 125" },
];

const sorted = (a, b) => {
  return (
    sortBy.findIndex((e) => a.includes(e)) -
      sortBy.findIndex((e) => b.includes(e)) ||
    secondSortBy.findIndex((e) => a.includes(e)) -
      secondSortBy.findIndex((e) => b.includes(e))
  );
};

const a = data
  .map((e) => (e.includes("分") ? e.replace("分", "分糖") : e))
  .sort(sorted)
  .map((s, index) => {});

console.log(`1${true}`);
