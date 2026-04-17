import {
  FiActivity,
  FiBell,
  FiCloud,
  FiGlobe,
  FiImage,
  FiLock,
  FiMapPin,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";

const features = [
  {
    title: "Profiles and Messaging",
    desc: "Create your identity and start rich one-to-one conversations instantly.",
    icon: FiMessageSquare,
  },
  {
    title: "Media Sharing",
    desc: "Send images, files, and links directly inside your chat timeline.",
    icon: FiImage,
  },
  {
    title: "Live Location",
    desc: "Share live location with people you trust in a single tap.",
    icon: FiMapPin,
  },
  {
    title: "Privacy Controls",
    desc: "Use profile visibility and message controls for safer communication.",
    icon: FiLock,
  },
  {
    title: "Cross-device Access",
    desc: "Use ConnectYou from anywhere with consistent performance.",
    icon: FiGlobe,
  },
  {
    title: "Custom Settings",
    desc: "Tune your profile, preferences, and app behavior your way.",
    icon: FiSettings,
  },
  {
    title: "Cloud Sync",
    desc: "Conversations stay updated and available across sessions.",
    icon: FiCloud,
  },
  {
    title: "Reliable Performance",
    desc: "Optimized UI for smooth, responsive communication at scale.",
    icon: FiActivity,
  },
];

const Feature = () => {
  return (
    <section
      className="w-full min-h-[100vh] bg-gradient-to-b from-c2 via-c1 to-c2 flex flex-col items-center justify-center pb-16 pt-24 cursor-default relative overflow-hidden"
      id="features"
    >
      <div className="absolute left-0 top-20 w-56 h-56 bg-sky-500/20 blur-3xl rounded-full" />
      <div className="absolute right-0 bottom-10 w-64 h-64 bg-emerald-400/20 blur-3xl rounded-full" />

      <div className="text-center pb-12 px-5 z-10 max-w-4xl">
        <p className="text-c3 uppercase tracking-[0.2em] text-xs mb-2">What you get</p>
        <h2 className="text-4xl md:text-5xl font-semibold">Feature Stack Built for Real Conversations</h2>
        <p className="text-c3 mt-4 text-base md:text-lg">No filler visuals. Just capabilities that improve communication quality and team presence.</p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-5 px-6 lg:px-12 z-10 max-w-7xl">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className="h-full bg-gradient-to-br from-cyan-300/60 via-sky-500/50 to-emerald-400/60 rounded-3xl p-[1px] overflow-hidden"
            >
              <div className="h-full min-h-[240px] w-full text-white bg-c1/95 rounded-3xl p-6 border border-c5/80 hover:translate-y-[-4px] transition duration-300 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-c1 flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-xl leading-tight pb-2">{feature.title}</h3>
                <p className="text-c3 text-sm leading-6">{feature.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Feature;
