import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PlayerLoading, PlayerWithControls } from "./Player";

export default async function PlayerPage({
  params,
}: { params: { type: "asset-short" | "bad-account" | "asset-long" | "livestream" | "jwt" } }) {
    //params.type="livestream";
    const data =
    params.type === "asset-long"
      ? ({
          type: params.type,
          wallet: "0x257B2457b10C02d393458393515F51dc8880300d", // main pub
          wallet2: "0.0.3648040", // Hedera
          title: "The video below is a long-form static asset.",
          playbackId: "be1e4f7z0yfw88wd",
        } as const)
        : params.type === "bad-account"
        ? ({
            type: params.type,
            wallet: "0xab8bd0d4eda57cd9ee5a058e498a791df13dfa65", // scammer
            wallet2: "0.0.3658040", // Hedera
            title: "Two Hot Girls One Laptop",
            playbackId: "be1e4f7z0yfw88wd",
          } as const)
      : params.type === "asset-short"
        ? ({
            type: params.type,
            wallet: "0x257B2457b10C02d393458393515F51dc8880300d", // main pub
            wallet2: "0.0.3668040", // Hedera
            title: "The video below is a short-form static asset.",
            playbackId: "cbddoks280eyu0x7",
          } as const)
        : params.type === "jwt"
          ? ({
              type: params.type,
              title: "The video below is a JWT-protected static asset.",
              playbackId: "c494mgnniubh601y",
            } as const)
          : params.type === "livestream"
            ? ({
                type: params.type,
                wallet: "0x257B2457b10C02d393458393515F51dc8880300d", // main pub
                wallet2: "0.0.3678040", // Hedera
                title: (
                  <>
                    Livestream demo
                  </>
                ),
                playbackId: "85c28sa2o8wppm58",
              } as const)
            : ({
                type: "unknown",
                title:
                  "The video below is from the playback ID passed in the URL.",
                playbackId: params.type,
              } as const);


              // get Harpie data of streamer
  async function getSummary(address) {
    const body = {
      address: address,
      apiKey: "74778fa4-88a8-4e35-922a-02bd82005edd", // public test key
      // apiKey: "167e9491-656c-4711-baa8-57ae347613b9", // my actual key

  }
  const response = await fetch('https://api.harpie.io/v2/validateAddress', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  return data;
  }

  const harpie=await getSummary(data.wallet);
 // mock data: {"name":"No Flags Detected","isMaliciousAddress":false,"isAssociatedWithProtocol":false,"summary":"This is an address without any known theft activity.","tags":{"THEFT":false,"CYBERCRIME":false,"NO_DATA":true,"SANCTIONED":false,"MIXER":false,"BOT":false,"WASH_TRADER":false,"SPEARHEAD_ATTACK":false}}

  return (
    <main className="flex relative min-h-screen flex-col items-center bg-black gap-8 py-12 md:py-8 p-4">
      <Link
        className="absolute flex gap-2 items-center font-medium hover:text-white/70 text-white/80 text-sm top-4 left-6"
        href="/"
      >
        <ArrowLeft className="w-4 h-4" /> Go back
      </Link>
      <div className="flex gap-2 max-w-lg text-center flex-col">
        <span className="text-2xl font-semibold">{data.title}</span>
        <span className="text-sm text-white/90">
          Eth Address: {data.wallet}<br />
          Hedera Account: {data.wallet2}<br />
          <hr></hr><br />
          Harpie Stats:<br />
          isMaliciousAddress: {harpie.isMaliciousAddress ? "true" : "false"}<br />
          isAssociatedWithProtocol: {harpie.isAssociatedWithProtocol ? "true" : "false"}<br />
          summary: {harpie.summary}<br />
          <hr></hr><br />
          Tip creator with Hedera money:<br />
          <button>
    Give 10 mini HBAR
  </button><br />
          This will send HBAR to the creator, creating an account for them if it doesn't exist already.
        </span>
      </div>

      <span className="h-px w-full max-w-md bg-gradient-to-r from-white/5 via-white/60 to-white/5" />

      <Suspense fallback={<PlayerLoading />}>
        <PlayerWithControls type={data.type} playbackId={data.playbackId} />
      </Suspense>
    </main>
  );
}

export async function generateStaticParams() {
  return [
    {
      type: "asset",
    },
    {
      type: "livestream",
    },
  ];
}
