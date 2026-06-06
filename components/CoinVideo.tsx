export default function CoinVideo() {
  return (
    <div className="video-container">
      <video
        width={300}
        height={300}
        autoPlay
        loop
        muted
        playsInline
        className="rounded-full object-cover"
      >
        <source src="/videos/coin.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
