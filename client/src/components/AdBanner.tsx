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
				minHeight: "280px", // ⬅️ espacio reservado (protege CLS)
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
					height: "280px", // ⬅️ altura fija
				}}
				data-ad-client="ca-pub-9789327885520093"
				data-ad-slot="6232254865"
				data-ad-format="rectangle" // ⬅️ formato estable
			></ins>
		</div>
	);
}
