/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [microsite, setMicrosite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentParticleSet, setCurrentParticleSet] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const refreshIntervalRef = useRef(null);
  const lastUserActivityRef = useRef(Date.now());
  const isDocumentVisibleRef = useRef(true);

  const STATIC_TITLE = "FWB+ Organizer";
  const STATIC_SUBTITLE = "FWB+ Organizer";
  const STATIC_DESCRIPTION =
    "Penyelenggara acara profesional untuk corporate gathering, pameran, konser, dan perayaan spesial di Jogja & Semarang.";

  const REFRESH_INTERVAL = 30000;
  const USER_ACTIVITY_THRESHOLD = 5000;
  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 5000;

  // Contact Information
  const contactInfo = {
    phone: "081944074542",
    name: "Lanang Prakoso Harunon",
    email: "fwbplus.eo@gmail.com",
    instagram: "@fwbplus.organizer",
    instagramUrl: "https://instagram.com/fwbplus.organizer",
    offices: [
      {
        city: "Jogja",
        address:
          "Jl. Sidorejo No.5, Desa Rejodadi, Padukuhan Nggobayan, Kel Ngestiharjo, Kec Kasihan, Kab Bantul, DI Yogyakarta. 55182",
      },
      {
        city: "Semarang",
        address:
          "Jl. Sinar Waluyo Raya, Kel. Kedungmundu, Kec. Tembalang, Kota Semarang, 50273",
      },
    ],
  };

  // Company showcase images
  const companyImages = [
    "/images/corporate-events.JPG",
    "/images/entertainment.JPG",
    "/images/event-equipment.JPG",
    "/images/exhibition.JPG",
    "/images/gathering.JPG",
  ];

  // Enhanced SVG Social Icons with gradients
  const socialIcons = {
    website: (
      <svg className="w-6 h-6" fill="url(#websiteGradient)" viewBox="0 0 24 24">
        <defs>
          <linearGradient
            id="websiteGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1a7be6" />
            <stop offset="100%" stopColor="#0066cc" />
          </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    whatsapp: (
      <svg
        className="w-6 h-6"
        fill="url(#whatsappGradient)"
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient
            id="whatsappGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#25D366" />
            <stop offset="100%" stopColor="#128C7E" />
          </linearGradient>
        </defs>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.528" />
      </svg>
    ),
    instagram: (
      <svg
        className="w-6 h-6"
        fill="url(#instagramGradient)"
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient
            id="instagramGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#E4405F" />
            <stop offset="50%" stopColor="#F56040" />
            <stop offset="100%" stopColor="#FCAF45" />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    facebook: (
      <svg
        className="w-6 h-6"
        fill="url(#facebookGradient)"
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient
            id="facebookGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1877F2" />
            <stop offset="100%" stopColor="#42A5F5" />
          </linearGradient>
        </defs>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-6 h-6" fill="url(#twitterGradient)" viewBox="0 0 24 24">
        <defs>
          <linearGradient
            id="twitterGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1DA1F2" />
            <stop offset="100%" stopColor="#0D8BD9" />
          </linearGradient>
        </defs>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  };

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % companyImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [companyImages.length]);

  // Rotate particle sets
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentParticleSet((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Fixed fetchMicrositeData function definition with useCallback
  const fetchMicrositeData = useCallback(
    async (isBackgroundRefresh = false) => {
      if (isBackgroundRefresh && !loading) {
        const timeSinceActivity = Date.now() - lastUserActivityRef.current;
        if (timeSinceActivity < USER_ACTIVITY_THRESHOLD) {
          return;
        }
      }

      if (isBackgroundRefresh && !isDocumentVisibleRef.current) {
        return;
      }

      if (isBackgroundRefresh) {
        setIsRefreshing(true);
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch("/api/microsite_data_fetch", {
          signal: controller.signal,
          cache: "no-store",
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.microsite) {
          const newDataString = JSON.stringify(data.microsite);
          const currentDataString = JSON.stringify(microsite);

          if (newDataString !== currentDataString) {
            setMicrosite(data.microsite);
            setLastUpdated(Date.now());
          }

          setError(null);
          setRetryCount(0);
        } else {
          throw new Error(data.error || "Failed to load microsite data");
        }
      } catch (err) {
        console.error("Error fetching microsite:", err);

        if (!isBackgroundRefresh || retryCount >= MAX_RETRY_ATTEMPTS) {
          setError(
            err.name === "AbortError"
              ? "Request timeout"
              : "Failed to load microsite data"
          );
        }

        if (isBackgroundRefresh && retryCount < MAX_RETRY_ATTEMPTS) {
          setRetryCount((prev) => prev + 1);
          const delay = RETRY_DELAY * Math.pow(2, retryCount);
          setTimeout(() => fetchMicrositeData(true), delay);
        }
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [loading, microsite, retryCount, MAX_RETRY_ATTEMPTS, RETRY_DELAY]
  );

  const updateUserActivity = () => {
    lastUserActivityRef.current = Date.now();
  };

  const handleVisibilityChange = useCallback(() => {
    isDocumentVisibleRef.current = !document.hidden;

    if (!document.hidden) {
      const timeSinceLastUpdate = Date.now() - (lastUpdated || 0);
      if (timeSinceLastUpdate > REFRESH_INTERVAL) {
        fetchMicrositeData(true);
      }
    }
  }, [lastUpdated, REFRESH_INTERVAL, fetchMicrositeData]);

  useEffect(() => {
    fetchMicrositeData();

    refreshIntervalRef.current = setInterval(() => {
      fetchMicrositeData(true);
    }, REFRESH_INTERVAL);

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];
    events.forEach((event) => {
      document.addEventListener(event, updateUserActivity, { passive: true });
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, updateUserActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchMicrositeData, handleVisibilityChange, REFRESH_INTERVAL]);

  const handleManualRefresh = () => {
    updateUserActivity();
    fetchMicrositeData(false);
  };

  const handleLinkClick = (url) => {
    updateUserActivity();
    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  const handleSocialClick = (platform, url) => {
    updateUserActivity();
    let finalUrl = url;

    if (platform === "whatsapp" && !url.startsWith("https://wa.me/")) {
      let phoneNumber = url.replace(/[^0-9]/g, "");

      if (phoneNumber.startsWith("08")) {
        phoneNumber = "62" + phoneNumber.substring(1);
      }
      else if (phoneNumber.startsWith("620")) {
        phoneNumber = "62" + phoneNumber.substring(3);
      }
      else if (!phoneNumber.startsWith("62")) {
        phoneNumber = "62" + phoneNumber;
      }

      finalUrl = `https://wa.me/${phoneNumber}`;
    } else if (!url.startsWith("http")) {
      finalUrl = `https://${url}`;
    }

    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Halo, saya tertarik dengan layanan FWB+ Organizer. Bisa tolong berikan informasi lebih lanjut?"
    );

    let phoneNumber = contactInfo.phone.replace(/[^0-9]/g, "");

    if (phoneNumber.startsWith("08")) {
      phoneNumber = "62" + phoneNumber.substring(1);
    }
    else if (phoneNumber.startsWith("620")) {
      phoneNumber = "62" + phoneNumber.substring(3);
    }
    else if (!phoneNumber.startsWith("62")) {
      phoneNumber = "62" + phoneNumber;
    }

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:${contactInfo.phone}`, "_self");
  };

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, "_blank");
  };

  const handleInstagramClick = () => {
    window.open(contactInfo.instagramUrl, "_blank");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
        {/* Decorative elements - same as Hero */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Circles */}
          <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>

          {/* Floating shapes */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-8 h-8 rounded-md bg-[#1a7be6]/20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-[#f35e0e]/20"
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[25%] right-[20%] w-12 h-12 rounded-md rotate-45 bg-[#1a7be6]/10"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative z-10 max-w-md mx-auto px-6"
        >
          {/* Modern Logo Container */}
          <motion.div
            className="relative w-24 h-24 mx-auto mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
          >
            {/* Animated ring around logo */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-200"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(26, 123, 230, 0.3), transparent)",
              }}
            />

            {/* Logo container */}
            <div className="relative w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center border border-blue-100">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/assets/logo/Logo FWB PNG Transparan.png"
                  alt="FWB Plus Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Floating particles around logo - similar to Hero pattern */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#1a7be6] rounded-full opacity-30"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                }}
                animate={{
                  rotate: [0 + i * 60, 360 + i * 60],
                  scale: [0.5, 1, 0.5],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                transform={`translate(-50%, -50%) translateY(-40px)`}
              />
            ))}
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-unbounded font-bold text-gray-900">
              Memuat {STATIC_TITLE}
            </h2>

            <p className="text-gray-600 font-rubik text-sm">
              Menghubungkan ke layanan kami
            </p>

            {/* Modern Progress Indicator */}
            <div className="relative w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1a7be6] to-blue-600 rounded-full"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ width: "40%" }}
              />
            </div>

            {/* Loading Dots - similar to Hero animations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center space-x-2 pt-4"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#1a7be6] rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error && !microsite) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
        {/* Decorative elements - same as Hero */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Circles */}
          <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
          <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"></div>

          {/* Floating shapes */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-8 h-8 rounded-md bg-[#1a7be6]/20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-[#f35e0e]/20"
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[25%] right-[20%] w-12 h-12 rounded-md rotate-45 bg-[#1a7be6]/10"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto p-8 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>

          <h2 className="text-2xl font-unbounded font-bold text-gray-900 mb-4">
            Connection Issue
          </h2>
          <p className="font-rubik text-gray-600 mb-6">{error}</p>

          <motion.button
            onClick={handleManualRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-8 py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg shadow-blue-200 group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Try Again</span>
            </span>
            <motion.span
              className="absolute inset-0 bg-blue-600 z-0"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.button>

          <p className="font-rubik text-gray-400 text-sm mt-4">
            Auto-retry in progress...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!microsite) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
        {/* Decorative elements - same as Hero */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Circles */}
          <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
          <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"></div>

          {/* Floating shapes */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-8 h-8 rounded-md bg-[#1a7be6]/20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-[#f35e0e]/20"
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[25%] right-[20%] w-12 h-12 rounded-md rotate-45 bg-[#1a7be6]/10"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-unbounded font-semibold text-gray-700 mb-4">
            No Data Available
          </h2>
          <motion.button
            onClick={handleManualRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-8 py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg shadow-blue-200 group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span>Refresh</span>
              <motion.svg
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </span>
            <motion.span
              className="absolute inset-0 bg-blue-600 z-0"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const sortedLinks = microsite.links
    ? [...microsite.links].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  const activeSocialMedia = microsite.socialMedia
    ? Object.entries(microsite.socialMedia).filter(
        ([platform, url]) => url && platform !== "_id"
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements - same as Hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circles */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"></div>

        {/* Floating shapes */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-8 h-8 rounded-md bg-[#1a7be6]/20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-[#f35e0e]/20"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[20%] w-12 h-12 rounded-md rotate-45 bg-[#1a7be6]/10"
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Contact Modal - Similar to Hero modals */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl max-w-sm w-full overflow-hidden border border-blue-100/50 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 pb-4 bg-[#1a7be6] relative">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-unbounded font-bold text-white text-center"
                >
                  Hubungi Kami
                </motion.h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* WhatsApp Button */}
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleWhatsAppClick}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 15px -3px rgba(26, 123, 230, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center p-4 bg-white border border-gray-200 hover:border-[#1a7be6] rounded-2xl transition-all duration-200 shadow-sm"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.528" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-unbounded font-semibold text-gray-900">
                      WhatsApp
                    </div>
                    <div className="text-gray-500 font-rubik text-sm">
                      {contactInfo.phone}
                    </div>
                  </div>
                </motion.button>

                {/* Email Button */}
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleEmailClick}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 15px -3px rgba(26, 123, 230, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center p-4 bg-white border border-gray-200 hover:border-[#1a7be6] rounded-2xl transition-all duration-200 shadow-sm"
                >
                  <div className="w-10 h-10 bg-[#f35e0e] rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-unbounded font-semibold text-gray-900">
                      Email
                    </div>
                    <div className="text-gray-500 font-rubik text-sm">
                      {contactInfo.email}
                    </div>
                  </div>
                </motion.button>

                {/* Instagram Button */}
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleInstagramClick}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 15px -3px rgba(26, 123, 230, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center p-4 bg-white border border-gray-200 hover:border-[#1a7be6] rounded-2xl transition-all duration-200 shadow-sm"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-unbounded font-semibold text-gray-900">
                      Instagram
                    </div>
                    <div className="text-gray-500 font-rubik text-sm">
                      {contactInfo.instagram}
                    </div>
                  </div>
                </motion.button>

                {/* Office Locations */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="border-t border-gray-200 pt-4 mt-4"
                >
                  <h4 className="text-sm font-unbounded font-semibold text-gray-600 mb-3">
                    Kantor Kami
                  </h4>

                  <div className="space-y-3">
                    {contactInfo.offices.map((office, index) => (
                      <div key={index} className="bg-blue-50 rounded-xl p-3">
                        <div className="flex items-start space-x-3">
                          <svg
                            className="w-5 h-5 text-[#1a7be6] mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <div className="font-unbounded text-sm font-semibold text-gray-900">
                              {office.city}
                            </div>
                            <p className="text-gray-600 text-xs font-rubik leading-relaxed mt-1">
                              {office.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto"
        >
          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-between items-center mb-8 text-xs text-gray-500"
          >
            <div className="flex items-center space-x-2">
              <AnimatePresence>
                {isRefreshing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex items-center space-x-1"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-[#1a7be6] rounded-full"
                    />
                    <span className="font-rubik">Updating...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center space-x-1 text-amber-600"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-rubik">Connection issue</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Company Header Section with Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12"
          >
            {/* Company Logo and Image Carousel */}
            <div className="relative mb-8">
              <motion.div
                className="relative w-32 h-32 mx-auto mb-6"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-xl"></div>
                <div className="relative w-full h-full bg-white rounded-full shadow-2xl p-6 border border-blue-100">
                  <Image
                    src="/images/assets/logo/Logo FWB PNG Transparan.png"
                    alt="FWB Plus Logo"
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>

                {/* Decorative elements - similar to Hero */}
                <motion.div
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-md bg-[#1a7be6]/20"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-[#1a7be6]/10"
                  animate={{
                    y: [0, 5, 0],
                    x: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Company Showcase Images - similar to Hero carousel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative w-full h-48 rounded-3xl overflow-hidden shadow-xl shadow-blue-200/50 mb-6"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={companyImages[currentImageIndex]}
                      alt={`FWB+ Portfolio ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient overlay like in Hero */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </motion.div>
                </AnimatePresence>

                {/* Image indicators - like dot navigation in Hero */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {companyImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="relative p-1 focus:outline-none"
                    >
                      <motion.span
                        animate={{
                          scale: index === currentImageIndex ? 1 : 0.7,
                          opacity: index === currentImageIndex ? 1 : 0.5,
                        }}
                        className={`block w-3 h-3 rounded-full ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                      {index === currentImageIndex && (
                        <motion.span
                          layoutId="imageIndicator"
                          className="absolute inset-0 rounded-full border-2 border-white"
                          transition={{ duration: 0.5, type: "spring" }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h1 className="font-unbounded text-2xl md:text-3xl font-bold leading-tight text-gray-900 mb-3">
                <span className="relative">
                  <span className="relative z-10">{STATIC_TITLE}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-blue-100 rounded-full -z-10"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </span>
              </h1>

              <p className="text-gray-600 font-rubik text-lg leading-relaxed max-w-md mx-auto">
                {STATIC_DESCRIPTION}
              </p>
            </motion.div>

            <AnimatePresence>
              {microsite.isPublished && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 shadow-lg mt-6 border border-green-200"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full mr-3"
                  />
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                  Now Live & Active
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info Button - Hero-like styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <motion.button
              onClick={() => setShowContactModal(true)}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group border border-[#1a7be6]/20"
              style={{
                background: "linear-gradient(135deg, #1a7be6 0%, #1061c0 100%)",
              }}
            >
              {/* Button highlight effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
                animate={{
                  background: [
                    "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-unbounded font-bold text-white mb-1">
                      Kontak Bisnis
                    </h3>
                    <p className="text-blue-100 font-rubik text-sm">
                      Hubungi kami untuk konsultasi gratis
                    </p>
                  </div>
                </div>

                <motion.div
                  className="text-white/80"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.button>
          </motion.div>

          {/* Enhanced Links Section - similar to buttons in Hero */}
          <AnimatePresence>
            {sortedLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 mb-12"
              >
                {sortedLinks.map((link, index) => (
                  <motion.button
                    key={link.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    onClick={() => handleLinkClick(link.url)}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full bg-white backdrop-blur-md hover:bg-white border border-gray-200 hover:border-[#1a7be6]/30 rounded-2xl p-4 text-center font-medium text-gray-900 transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#1a7be6] focus:ring-offset-2 relative overflow-hidden"
                  >
                    {/* Subtle background effect - similar to Hero */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-400/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={{
                        background: [
                          "linear-gradient(90deg, rgba(26,123,230,0.05) 0%, rgba(96,165,250,0.05) 50%, rgba(37,99,235,0.05) 100%)",
                          "linear-gradient(90deg, rgba(37,99,235,0.05) 0%, rgba(26,123,230,0.05) 50%, rgba(96,165,250,0.05) 100%)",
                          "linear-gradient(90deg, rgba(96,165,250,0.05) 0%, rgba(37,99,235,0.05) 50%, rgba(26,123,230,0.05) 100%)",
                        ],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#1a7be6] to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Image
                            src="/images/assets/logo/Logo FWB PNG Transparan.png"
                            alt="FWB Plus"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain filter brightness-0 invert"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-unbounded font-bold text-gray-900 group-hover:text-[#1a7be6] transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-sm font-rubik text-gray-500">
                            Click to visit
                          </p>
                        </div>
                      </div>

                      <motion.div
                        className="text-gray-400 group-hover:text-[#1a7be6] transition-colors"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Social Media Section */}
          <AnimatePresence>
            {activeSocialMedia.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-blue-100/50 shadow-xl"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-center text-gray-800 font-unbounded font-bold mb-4 text-xl"
                >
                  Connect With Us
                </motion.h3>

                <div className="flex justify-center space-x-6">
                  {activeSocialMedia.map(([platform, url], index) => (
                    <motion.button
                      key={platform}
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 1.4 + index * 0.15,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      onClick={() => handleSocialClick(platform, url)}
                      whileHover={{
                        scale: 1.2,
                        y: -8,
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="group relative w-16 h-16 bg-white hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-200 overflow-hidden"
                      title={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    >
                      {/* Similar hover effect to Hero buttons */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#1a7be6]/10 via-blue-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                        whileHover={{
                          background: [
                            "linear-gradient(135deg, rgba(26,123,230,0.1) 0%, rgba(96,165,250,0.1) 50%, rgba(37,99,235,0.1) 100%)",
                            "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(26,123,230,0.1) 50%, rgba(96,165,250,0.1) 100%)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                        {socialIcons[platform] || "🔗"}
                      </span>

                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileHover={{
                          scale: 1.5,
                          opacity: 0,
                          transition: { duration: 0.6 },
                        }}
                        style={{
                          background:
                            "radial-gradient(circle, rgba(26,123,230,0.3) 0%, transparent 70%)",
                        }}
                      />
                    </motion.button>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="text-center text-gray-500 font-rubik text-sm mt-6"
                >
                  Follow us for updates
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-center mt-12 text-gray-500 text-sm"
          >
            {/* <div className="mb-4 flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6"
              >
                <Image
                  src="/images/assets/logo/Logo FWB PNG Transparan.png"
                  alt="FWB Plus"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain opacity-70"
                />
              </motion.div>
              <span className="font-medium font-rubik">
                Powered by FWB+ Microsite
              </span>
            </div> */}

            <p className="text-xs font-rubik opacity-75">
              © 2025{" "}
              <img
                src="https://fwbplus.id/images/assets/logo/fwb-text.webp"
                alt="FWB Plus"
                width={30}
                height={9}
                className="inline-block mx-1 align-middle"
              />{" "}
              All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider - same as in Hero */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F9FF" />
              <stop offset="50%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
    </div>
  );
}
