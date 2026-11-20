import { useState } from 'react'
import { type tyCategoryDict, type tyFaqDict } from "./declare";
import { constCategoryArr, constFaqArr } from "./declare";
import FaqQuestion from './FaqQuestion';
import FaqAnswer from './FaqAnswer';
import FaqCategory from './FaqCategory';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


export default function Faq() {

  const [stClickedQuestionId, setStClickedQuestionId] = useState<number>(0);
  const [stShowAnswer, setStShowAnswer] = useState<boolean>(false);

  const onClickShowAnswer = (id: number) => {
    setStClickedQuestionId(id);
    setStShowAnswer(true);
  };
  const onClickHideAnswer = () => {
    setStClickedQuestionId(0);
    setStShowAnswer(false);
  };

  return (
    <>
      <div className="faq">
        {constCategoryArr.map((catitem: tyCategoryDict, index: number) => (
          <div
            key={index}
            className="faqlist"
          >
            <FaqCategory name={catitem.name} />
            {constFaqArr.filter((faqitem: tyFaqDict) => faqitem.category === catitem.id).map((faqitem: tyFaqDict, index: number) => (
              <div
                key={index}
                className="faqitem"
              >
                <FaqQuestion
                  id={faqitem.id}
                  question={faqitem.question}
                  stClickedQuestionId={stClickedQuestionId}
                  stShowAnswer={stShowAnswer}
                  onClickShowAnswer={() => onClickShowAnswer(faqitem.id)}
                  onClickHideAnswer={onClickHideAnswer}
                />
                <div className={`w-full ${faqitem.id === stClickedQuestionId && stShowAnswer ? "block" : "hidden"}`}>
                  <FaqAnswer answer={faqitem.answer} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <FaChevronUp className="max-md:hidden absolute -top-7 self-center size-iconbniconsize text-txtcolor" />
      <FaChevronDown className="max-md:hidden absolute -bottom-7 self-center size-iconbniconsize text-txtcolor" />
    </>
  )
}
