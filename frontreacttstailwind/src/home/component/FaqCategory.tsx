


export type tyPropsFaqCategory = {
  name: string
};

export default function FaqCategory(props: tyPropsFaqCategory) {
  return (
    <div className="faqcategory">
      {props.name && <h5 className="font-bold text-center">{props.name}</h5>}
    </div>
  )
}