import ButtonIcon from "@/common/component/ButtonIcon";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


export type tyPropsFaqQuestion = {
  id: number,
  question: string,
  stClickedQuestionId: number,
  stShowAnswer: boolean,
  onClickShowAnswer: (id: number) => void,
  onClickHideAnswer: () => void
};

export default function FaqQuestion(props: tyPropsFaqQuestion) {
  return (
    <div className="faqquestion">
      <div>
        {props.question && <p className="font-bold text-left">{props.question}</p>}
      </div>
      <div>
        {props.id === props.stClickedQuestionId && props.stShowAnswer
          ? <ButtonIcon icon={FaChevronUp} onClick={props.onClickHideAnswer} />
          : <ButtonIcon icon={FaChevronDown} onClick={() => props.onClickShowAnswer(props.id)} />
        }
      </div>
    </div>
  )
}