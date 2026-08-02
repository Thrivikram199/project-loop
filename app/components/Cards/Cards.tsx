"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FaComments,
  FaSmile,
  FaFrown,
  FaMeh,
} from "react-icons/fa";

type Props = {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
};

export default function Cards({
  total,
  positive,
  negative,
  neutral,
}: Props) {
  const satisfaction =
    total === 0
      ? 0
      : Math.round((positive / total) * 100);

  const cards = [
    {
      title: "Total Feedback",
      value: total,
      icon: <FaComments />,
      gradient: "linear-gradient(135deg,#4f46e5,#6366f1)",
      progress: 100,
    },
    {
      title: "Positive",
      value: positive,
      icon: <FaSmile />,
      gradient: "linear-gradient(135deg,#16a34a,#22c55e)",
      progress: total
        ? (positive / total) * 100
        : 0,
    },
    {
      title: "Negative",
      value: negative,
      icon: <FaFrown />,
      gradient: "linear-gradient(135deg,#dc2626,#ef4444)",
      progress: total
        ? (negative / total) * 100
        : 0,
    },
    {
      title: "Neutral",
      value: neutral,
      icon: <FaMeh />,
      gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)",
      progress: total
        ? (neutral / total) * 100
        : 0,
    },
  ];

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: "25px",
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            transition={{
              duration: .25,
            }}
            style={{
              background: card.gradient,
              color: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 15px 35px rgba(0,0,0,.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "17px",
                    opacity: .9,
                  }}
                >
                  {card.title}
                </div>

                <h1
                  style={{
                    marginTop: "10px",
                    fontSize: "42px",
                  }}
                >
                  <CountUp
                    end={card.value}
                    duration={2}
                  />
                </h1>
              </div>

              <div
                style={{
                  fontSize: "42px",
                }}
              >
                {card.icon}
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  fontSize: "14px",
                }}
              >
                <span>Progress</span>

                <span>
                  {Math.round(card.progress)}%
                </span>
              </div>

              <div
                style={{
                  marginTop: "8px",
                  height: "8px",
                  borderRadius: "20px",
                  background:
                    "rgba(255,255,255,.25)",
                }}
              >
                <div
                  style={{
                    width: `${card.progress}%`,
                    height: "100%",
                    background: "white",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .5,
        }}
        style={{
          marginTop: "25px",
          background:
            "linear-gradient(90deg,#4f46e5,#6366f1)",
          color: "white",
          padding: "20px",
          borderRadius: "18px",
          textAlign: "center",
        }}
      >
        <h2>⭐ Customer Satisfaction</h2>

        <h1
          style={{
            fontSize: "52px",
            margin: "10px 0",
          }}
        >
          <CountUp
            end={satisfaction}
            duration={2}
          />
          %
        </h1>

        <p>
          Based on customer sentiment analysis
        </p>
      </motion.div>
    </>
  );
}