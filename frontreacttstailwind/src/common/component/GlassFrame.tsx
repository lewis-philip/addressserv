type tyPropsGlassFrame = {
  children: React.ReactNode
};

export default function GlassFrame(props: tyPropsGlassFrame) {

  return (
    <div className="glassframebase">
      <div className="glassframe">
        {props.children}
      </div>
    </div>
  )
};