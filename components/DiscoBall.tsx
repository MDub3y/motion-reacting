export default function DiscoBall() {
  return (
    <div className="video-container">
      <video
        width="300"
        height="300"
        autoPlay
        loop
        muted
        playsInline
        className="rounded-full object-cover"
      >
        <source src="/videos/discoball.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
