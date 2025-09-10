import "./App.css";
import BlurText from "./BlurText";
import SplitText from "./SplitText";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import DarkVeil from "./DarkVeil";
import { useScroll, useTransform, useSpring, MotionValue } from "motion/react";

function Box(props: any) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF("/mascot.glb");
  const { actions } = useAnimations(animations, group);

  const { scrollY } = useScroll();
  const vh = typeof window !== "undefined" ? window.innerHeight : 1;

  // Section index based on scroll
  const sectionIndex: MotionValue<number> = useTransform(scrollY, (y) =>
    Math.floor(y / (vh * 0.9))
  );

  const targetX: MotionValue<number> = useTransform(sectionIndex, (i) =>
    (i % 2 === 0 ? -2 : 2) as number
  );

  // Fix typing: convert MotionValue into a spring MotionValue
  const smoothX = useSpring(targetX, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    const action = actions?.ArmatureAction;
    if (action) {
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();

   //   const pauseTime = 1;
  
/* const onUpdate = () => {
        if (action.time >= pauseTime) {
          action.paused = true;
          action.time = pauseTime;
        }
      };
*/
      return () => {
        action.paused = false;
      };
    }
  }, [actions]);

  useFrame(() => {
    if (!group.current) return;
    group.current.position.z = smoothX.get();
    group.current.position.x = 0;
    group.current.position.y = 0.5;
    group.current.rotation.y = 1;
    group.current.rotation.y += 0.01;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone001} />
          <primitive object={nodes.Bone002} />
          <primitive object={nodes.Bone003} />
        </group>
      </group>
    </group>
  );
}

function App() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("email"));
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <DarkVeil />
      </div>

      {/* 3D Mascot */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [5, 0, 0], near: 0.01, far: 2000, fov: 50 }}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            color="#9584ff"
            decay={0}
            intensity={Math.PI}
          />
          <Box scale={[1, 1, 1]} position={[0, 0, 0]} />
        </Canvas>
      </div>

      {/* Content */}
      <div>
        {/* Hero */}
        <section className="hero">
          <SplitText
            text="Effortless Studying"
            className="hero-text"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <BlurText
            text="our all-in-one learning companion that makes study time smarter and more fun. Explore lessons your way and discover tools to stay on track."
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="subtitle"
          />
          <BlurText
            text="There's more waiting to be unlocked."
            delay={250}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="subtitle bottom-subtitle"
          />
          <button className="cta-button">Start Learning</button>
        </section>

        {/* Features.. (unchanged) */}
<section className='feature-block right-section'> <BlurText text='Learn Your Way' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-title' /> <ul className='section-list'> <li className='section-list-item'> <BlurText text='Custom lessons designed for your curriculum' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' />{" "} </li> <li className='section-list-item'> <BlurText text='Podcast-style audio lessons you can listen to anywhere ' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li>{" "} <li className='section-list-item'> <BlurText text='Video lessons to see concepts in action ' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> </ul> </section> <section className='feature-block left-section'> <BlurText text='Spaced Repetition' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-title' /> <ul className='section-list'> <li className='section-list-item'> <BlurText text='Scientifically proven to boost memory rentention' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' />{" "} </li> <li className='section-list-item'> <BlurText text='Flashcards that adapt to your learning' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li>{" "} <li className='section-list-item'> <BlurText text='Quizzes to test your knowledge and track progress' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> </ul> </section> <section className='feature-block right-section'> <BlurText text='Celebrate Small Wins' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-title' /> <ul className='section-list'> <li className='section-list-item'> <BlurText text='Fun celebration screens when you finish activities or extend streaks' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='Memory streaks to keep you motivated and track progress' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='Daily mini-challenges to keep the learning momentum going' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> </ul> </section> <section className='feature-block left-section'> <BlurText text='Focus Mode' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-title' /> <ul className='section-list'> <li className='section-list-item'> <BlurText text='Pomodoro timer to stay focused without distractions' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='Custom study timetable tailored to your schedule and priorities' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='Exam reminders to keep you on track' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> </ul> </section> <section className='feature-block right-section'> <BlurText text='Study Companion' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-title' /> <ul className='section-list'> <li className='section-list-item'> <BlurText text='AI Tutor Chatbot trained on your curriculum' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='Ask questions anytime and get instant explanations' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='AI-recommended activities based on your strengths and goals' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> </ul> </section> <section className='feature-block left-section'> <BlurText text='Track Your Wins' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-title' /> <ul className='section-list'> <li className='section-list-item'> <BlurText text='Weekly wrap-ups & insights to see your progress' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='Highlight what you nailed and what needs more attention' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> <li className='section-list-item'> <BlurText text='Progress badges for milestones and achievements' delay={150} animateBy='words' direction='top' onAnimationComplete={handleAnimationComplete} className='section-list-text' /> </li> </ul> </section>
        {/* Call to action */}
        <button id="download-button">[Download Now]</button>

        {/* Mailing list */}
        <section className="mailing-listt">
          <h3>Stay informed</h3>
          <p>
            Sign in to our mailing list and stay updated on features, promotions
            and releases
          </p>
          <div className="mailing-list-input-container">
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" required />
              <button  type="submit">Submit</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

useGLTF.preload("/mascot.glb");

export default App;

