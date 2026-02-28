import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div
      style={{
        margin: "20px 0",
        textAlign: "center",
        minHeight: "280px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "728px",
          height: "280px",
        }}
        data-ad-client="ca-pub-978932785520893"
        data-ad-slot="6232254856"
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
