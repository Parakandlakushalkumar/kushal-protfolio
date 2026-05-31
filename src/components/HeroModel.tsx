import { Center, useGLTF } from '@react-three/drei';

const MODEL_SRC = '/confident_professional_in_a_black_suit.glb';

export default function HeroModel() {
  const { scene } = useGLTF(MODEL_SRC);

  return (
    <Center position={[0, -0.35, 0]}>
      <primitive object={scene} scale={1.75} />
    </Center>
  );
}

useGLTF.preload(MODEL_SRC);
