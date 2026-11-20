import videoHome from "@/assets/videohome.mp4";


export default function VideoHome() {
  return (
    <video
      autoPlay loop muted
      className="videohome"
    >
      <source src={videoHome} type="video/mp4"/>
    </video>
  )
}