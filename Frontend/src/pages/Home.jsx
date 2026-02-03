import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Pagination } from "swiper/modules";
import confetti from "canvas-confetti";

// 🔗 Add your backend URL here
const API_URL = "http://localhost:5000";

const Home = () => {
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");

  // 📩 Admin messages state
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messagesError, setMessagesError] = useState("");

  // 🔄 Load admin messages
  const loadMessages = async () => {
    setLoadingMessages(true);
    setMessagesError("");

    try {
      const res = await fetch(`${API_URL}/api/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setMessagesError("Failed to load messages 💔");
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    loadMessages();
  }, []);

  // ✅ Celebrate YES → Save to backend
  const celebrate = async () => {
    try {
      await fetch(`${API_URL}/api/yes`, { method: "POST" });

      // Confetti animation
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#ff4d6d", "#ffffff"],
      });

      alert("I knew you'd say yes! Happy Valentine's Day! ❤️");
    } catch (err) {
      alert("Something went wrong 💔");
    }
  };

  // ✅ Send reply → Save to backend
  const simpleSend = async () => {
    if (reply.trim() === "") {
      return alert("Please write something first! 😊");
    }

    try {
      await fetch(`${API_URL}/api/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reply }),
      });

      setStatus("Your message has been saved in my heart! ❤️");
      setReply("");
      setTimeout(() => setStatus(""), 4000);
    } catch (err) {
      alert("Something went wrong 💔");
    }
  };

  return (
    <div className="font-sans bg-[#fdfaf6] text-[#2d2d2d]">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div data-aos="fade-down">
          <h1 className="text-4xl sm:text-6xl font-[Dancing Script] text-[#ff4d6d] mb-3 drop-shadow-md">
            A Letter to the Best Girl Ever
          </h1>
          <p className="uppercase tracking-widest text-gray-700 text-sm sm:text-base">
            Happy Valentine's Day
          </p>
        </div>
        <a
          href="#gallery"
          className="mt-6 bg-[#ff4d6d] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Start mo
        </a>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="flex flex-col items-center py-16 sm:py-20 px-4"
      >
        <h2
          data-aos="fade-up"
          className="text-2xl sm:text-4xl font-[Dancing Script] text-[#ff4d6d] mb-8 sm:mb-10 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-md"
        >
          Best Memories
        </h2>

        <div className="flex flex-col gap-12">
          {/* SWIPER 1 - Rounded Cards */}
          <Swiper
            modules={[EffectCards, Pagination]}
            effect="cards"
            grabCursor
            pagination={{ clickable: true }}
            className="w-72 sm:w-80 h-80 sm:h-96 mx-auto"
            data-aos="fade-right"
          >
            {["2019", "2022", "2024"].map((_, idy) => (
              <SwiperSlide
                key={idy}
                className="bg-white p-2 rounded-full shadow-lg flex flex-col items-center justify-center"
              >
                {/* Name at top */}
                <span className="text-[#ff4d6d] font-[Dancing Script] text-lg sm:text-xl mb-2">
                  Ryzie
                </span>
                <img
                  src={`/images/img${idy + 1}.JPG`}
                  alt="Ryzie"
                  className="w-full h-auto rounded-full object-cover aspect-square border-4 border-pink-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* SWIPER 2 - Polaroid Style */}
          <Swiper
            modules={[EffectCards, Pagination]}
            effect="cards"
            grabCursor
            pagination={{ clickable: true }}
            className="w-72 sm:w-80 h-80 sm:h-96 mx-auto"
            data-aos="fade-left"
          >
            {["2019", "2022", "2024"].map((_, idy) => (
              <SwiperSlide
                key={idy}
                className="bg-white p-3 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-all"
              >
                {/* Name at top */}
                <span className="text-[#ff4d6d] font-[Dancing Script] text-lg sm:text-xl mb-2 block text-center">
                  Ryzie
                </span>
                <img
                  src={`/images/pic${idy + 1}.jpg`}
                  alt="Ryzie"
                  className="w-full h-auto rounded-lg object-cover aspect-[4/5] border-2 border-gray-300 shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* SWIPER 3 - Shadow Stack */}
          <Swiper
            modules={[EffectCards, Pagination]}
            effect="cards"
            grabCursor
            pagination={{ clickable: true }}
            className="w-72 sm:w-80 h-80 sm:h-96 mx-auto"
            data-aos="fade-up"
          >
            {["2019", "2022", "2024"].map((_, idy) => (
              <SwiperSlide
                key={idy}
                className="bg-white p-2 rounded-lg shadow-xl flex flex-col items-center justify-center"
              >
                {/* Name at top */}
                <span className="text-[#ff4d6d] font-[Dancing Script] text-lg sm:text-xl mb-2">
                  Ryzie
                </span>
                <img
                  src={`/images/image${idy + 1}.JPG`}
                  alt="Ryzie"
                  className="w-full h-auto rounded-lg object-cover aspect-[3/4] shadow-2xl transform scale-[0.95] hover:scale-100 transition-transform"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Letter Section */}
      <section className="py-12 sm:py-20 flex justify-center px-4">
        <div className="max-w-2xl px-5 text-center" data-aos="fade-up">
          <p className="mb-4 text-sm sm:text-base">
            On this special day of love, I want to take a moment to express my
            undying love for you.
          </p>
          <span className="block font-[Dancing Script] text-[#ff4d6d] text-base sm:text-xl my-4">
            Hindi ko man masabi agad ang lahat, pero gusto kitang makilala nang
            mas mabuti, maging malapit sa isa't-isa, at unti-unting patunayan
            ang aking intensyon.
          </span>
          <p className="text-sm sm:text-base">
            casual lang, chil lang, okay lang, kaya lang.
          </p>
        </div>
      </section>

      {/* Valentine Ask Section */}
      <section className="py-12 sm:py-20 bg-[#fff0f3] flex justify-center px-4">
        <div
          className="max-w-xl w-full p-6 sm:p-8 border-2 border-dashed border-[#ff4d6d] rounded-2xl bg-white text-center"
          data-aos="fade-up"
        >
          <h2 className="text-2xl sm:text-4xl mb-6 font-[Dancing Script] bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-md">
            Will you be my Valentine?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <button
              onClick={celebrate}
              className="bg-[#ff4d6d] text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
            >
              YES! ❤️
            </button>
            <button className="bg-gray-400 text-white px-6 py-3 rounded-full font-bold cursor-not-allowed">
              No
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Reply Section */}
      <footer className="bg-white py-12 sm:py-16 text-center px-4">
        <div className="max-w-2xl mx-auto" data-aos="zoom-in">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Nagmamahal, Goyo.
          </h2>
          <p className="text-sm sm:text-base">
            <strong className="text-30px">Ryzie</strong>,<br /> Sa dami ng
            nangyayari ngayon, ikaw pa rin ang iniisip ko. Hindi man ako
            magaling magsalita, gusto kong malaman mo na mahalaga ka sa akin.
            ikaw ang pahinga ko. Hindi ko alam kung saan ako dadalhin ng bukas,
            pero sigurado ako sa isang bagay, ikaw ang gusto kong makasama
            habang hinaharap ito. <br />
            -Goyo
          </p>

          <div className="mt-6 sm:mt-8">
            <h3 className="font-[Dancing Script] text-xl sm:text-2xl mb-2">
              put a message response at date kong kaylan mo gusto na araw.,..,.
            </h3>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your sweet message here..."
              className="w-full max-w-md h-20 sm:h-24 border-2 border-[#ff4d6d] rounded-xl p-3 mb-3 outline-none text-sm sm:text-base"
            ></textarea>
            <br />
            <button
              onClick={simpleSend}
              className="bg-[#ff4d6d] text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
            >
              Send Message
            </button>
            {status && (
              <div className="mt-3 font-bold text-[#ff4d6d]">{status}</div>
            )}
          </div>

          <p className="font-[Dancing Script] text-xl sm:text-2xl mt-8 sm:mt-10 drop-shadow-md">
            from: EJ
          </p>
        </div>
      </footer>
      {/* ================= ADMIN MESSAGES (TOP) ================= */}
      <section className="bg-white py-6 px-4 border-b">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-[Dancing Script] text-[#ff4d6d] mb-4">
            Messages 💌
          </h2>

          {/* Refresh Button */}
          <button
            onClick={loadMessages}
            className="mb-4 bg-[#ff4d6d] text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Refresh
          </button>

          {loadingMessages && <p>Loading messages...</p>}

          {!loadingMessages && messages.length === 0 && <p>No messages yet.</p>}

          {messagesError && <p className="text-red-500">{messagesError}</p>}

          <ul className="space-y-3 text-sm">
            {messages.map((msg, index) => (
              <li
                key={index}
                className="border border-pink-300 rounded-xl p-3 bg-[#fff0f3]"
              >
                <div className="text-gray-500 text-xs mb-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
                <div>{msg.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
