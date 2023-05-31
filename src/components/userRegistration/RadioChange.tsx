export default function RadioChange({
  radio,
  setRadio,
}: {
  radio: string;
  setRadio: React.Dispatch<React.SetStateAction<string>>;
}) {
  //ラジオボタン
  const handleOptionChange = (event) => {
    setRadio(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="Java"
          checked={radio === "Java"}
          onChange={handleOptionChange}
        />
        Java
      </label>
      <label>
        <input
          type="radio"
          value="ML"
          checked={radio === "ML"}
          onChange={handleOptionChange}
        />
        ML
      </label>
      <label>
        <input
          type="radio"
          value="CL"
          checked={radio === "CL"}
          onChange={handleOptionChange}
        />
        CL
      </label>
      <label>
        <input
          type="radio"
          value="QA"
          checked={radio === "QA"}
          onChange={handleOptionChange}
        />
        QA
      </label>
      <label>
        <input
          type="radio"
          value="PHP"
          checked={radio === "PHP"}
          onChange={handleOptionChange}
        />
        PHP
      </label>
      <label>
        <input
          type="radio"
          value="営業"
          checked={radio === "営業"}
          onChange={handleOptionChange}
        />
        営業
      </label>
      <label>
        <input
          type="radio"
          value="内勤"
          checked={radio === "内勤"}
          onChange={handleOptionChange}
        />
        内勤
      </label>
    </div>
  );
}
