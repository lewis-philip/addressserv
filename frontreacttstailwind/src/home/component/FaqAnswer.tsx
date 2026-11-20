


export type tyPropsFaqAnswer = {
  answer: string
};

export default function FaqAnswer(props: tyPropsFaqAnswer) {
  return (
   <div className="faqanswer">
      {props.answer && <p className="text-justify">{props.answer}</p>}
    </div>
  )
}