'use client'

import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default function Page() {

    const AnimatedNameList = ({ names }: any) => {
        const controls = useAnimationControls();
        const [currentName, setCurrentName] = useState(0);

        useEffect(() => {
            const animateNames = async () => {
                    for (let i = 0; i < names.length; i++) {

                        // Go to top, get there instantly
                        await controls.start({ y: -40, transition: { duration: 0 } });

                        // Go to center, spring effect, get there in 0.7s
                        await controls.start({ y: 0, opacity: 1, transition: { duration: 0.7, type: "spring" } });

                        // Wait 2s, then go to bottom, get there in 0.5s
                        await controls.start({ y: 40, transition: { duration: 0.7, delay: 2, type: "spring" } })

                        // Go transparent instanly after reaching the bottom
                        await controls.start({ opacity: 0, transition: { duration: 0 } })

                        // Add a new name
                        setCurrentName((prev) => (prev + 1) % names.length);

                        // Repeat for each name
                    }
            };

            animateNames();
        }, [controls, names]);

        return (
            <div className="border-[40px] border-white bg-transparent relative">
                <div
                    className="rounded-2xl py-3 px-4 w-[190px]"
                >
                    <p className="text-xl text-neutral-500">uzine.me/<motion.span initial={{ y: -40 }} animate={controls} className="text-black absolute z-[-1] font-bold tracking-tight lowercase">{names[currentName]}</motion.span></p>
                </div>
            </div>
        );
    };

    const NameList = () => {
        const names = [
            'Dallas',
            'Maxwell',
            'Andrue',
            'Reed',
            'Marc',
            'Sariah',
            'Jackson',
            'Shannon',
            'Eric',
            'Jamey',
            'Kevin',
            'Mia',
            'Ethan',
            'Amelia',
            'Harper',
            'Ben',
            'Elijah',
            'Abigail',
            'Samuel',
            'Logan',
            'Grace',
            'Oliver',
            'Ava',
            'Mia',
            'William'
        ];

        return <AnimatedNameList names={names} />;
    };

    return (
        <div className="relative flex flex-col justify-center items-center gap-14 mt-[190px] mb-auto">
            <motion.div
                initial={{ y: -750, x: 200 }}
                animate={{ y: -200, x: 340, rotate: 440 }}
                transition={{ duration: 3, type: "spring" }}
                className="absolute bg-[#E3E9F5] w-20 h-20 rounded-3xl z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: 220 }}
                animate={{ y: -195, x: 390, rotate: 410 }}
                transition={{ duration: 3, type: "spring" }}
                className="absolute bg-[#7491F2] w-10 h-10 rounded-xl z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: 400 }}
                animate={{ y: 175, x: 545, rotate: 350 }}
                transition={{ duration: 7, type: "spring" }}
                className="absolute bg-[#D1FADA] w-20 h-20 rounded-3xl z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: 400 }}
                animate={{ y: 125, x: 455, rotate: 0 }}
                transition={{ duration: 7, type: "spring" }}
                className="absolute bg-[#5EE55F] w-10 h-10 rounded-full z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: -400 }}
                animate={{ y: -245, x: -245, rotate: 760 }}
                transition={{ duration: 2, type: "spring" }}
                className="absolute bg-[#F8DFDF] w-20 h-20 rounded-3xl z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: -400 }}
                animate={{ y: -255, x: -300, rotate: 560 }}
                transition={{ duration: 2, type: "spring" }}
                className="absolute bg-[#F17575] w-10 h-10 rounded-xl z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: -500 }}
                animate={{ y: -170, x: -550, rotate: 580 }}
                transition={{ duration: 12, type: "spring" }}
                className="absolute bg-[#fceee5] w-20 h-20 rounded-3xl z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: -500 }}
                animate={{ y: -130, x: -510, rotate: 0 }}
                transition={{ duration: 11, type: "spring" }}
                className="absolute bg-[#edab60] w-10 h-10 rounded-full z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: -500 }}
                animate={{ y: 150, x: -550, rotate: 580 }}
                transition={{ duration: 8, type: "spring" }}
                className="absolute bg-[#fce5fb] w-20 h-20 rounded-3xl z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div
                initial={{ y: -750, x: -500 }}
                animate={{ y: 40, x: -510, rotate: 0 }}
                transition={{ duration: 8, type: "spring" }}
                className="absolute bg-[#ED60EA] w-10 h-10 rounded-full z-50 shadow cursor-grab"
                drag
            ></motion.div>
            <motion.div className="text-center"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, type: "spring" }}>
                <Image src={'/uzineLogo.svg'} height={100} width={100} alt="Uzine Logo" />
                <h1 className="text-xl font-bold tracking-tighter text-black">uzine</h1>
            </motion.div>
            <motion.h2 className="lg:text-[64px] md:text-5xl text-3xl text-center tracking-tighter font-extrabold leading-tight"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 4, delay: 0.5, type: "spring" }}>
                Your zine.<br />Unopinionated.
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 4, delay: 0.8, type: "spring" }}>
                <NameList />
            </motion.div>
            <motion.div
                className="flex flex-col justify-center items-center gap-5"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 4, delay: 1, type: "spring" }}>
                <Link href={'/signup'} className="border rounded-xl shadow-inset-home-btn border-[rgba(12,12,12,0.19)] flex justify-center items-center py-3 px-4 w-[185px] hover:scale-105 duration-150 ease-linear group">
                    <p className="text-lg text-neutral-500 tracking-tight font-semibold group-hover:text-black transition-colors duration-100 ease-linear">Create your zine</p>
                </Link>
                <AuthButton />
            </motion.div>
        </div>
    )
}