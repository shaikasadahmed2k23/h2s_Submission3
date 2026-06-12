import { useRef, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Cloud, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { getPollutionFactor } from '../utils/calculator'
import { WORLD_CONFIG, WORLD_STATUS, SCORE_CONFIG } from '../constants/config'

/**
 * Linearly interpolates between two hex colors.
 * Used for smooth color transitions based on pollution level.
 *
 * @private
 * @param {string} a - Start hex color (e.g., '#00FF00')
 * @param {string} b - End hex color (e.g., '#FF0000')
 * @param {number} t - Interpolation factor (0-1)
 * @returns {string} Interpolated color as hex string
 */
function lerpColor(a, b, t) {
  const ca = new THREE.Color(a)
  const cb = new THREE.Color(b)
  return ca.lerp(cb, t)
}

// ─── Tree ────────────────────────────────────────────────────────────────────

/**
 * Single stylized tree model that morphs visually based on pollution level.
 * Green and healthy when clean, brown and withered when polluted.
 *
 * @private
 * @param {Object} props - Component props
 * @param {number[]} props.position - [x, y, z] position in 3D space
 * @param {number} props.pollution - Pollution factor (0-1) affecting tree appearance
 * @param {number} props.scale - Scale multiplier for tree size
 * @returns {React.ReactElement} Three.js Group with tree geometry
 */
function Tree({ position, pollution, scale = 1 }) {
  const foliageColor = lerpColor('#2d6a4f', '#4a3728', pollution)
  const trunkColor = lerpColor('#5c4033', '#3d2b1f', pollution * 0.5)

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.2, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      {/* Foliage layers */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 1.4 + i * 0.55, 0]} castShadow>
          <coneGeometry args={[0.9 - i * 0.2, 1.1, 7]} />
          <meshStandardMaterial
            color={foliageColor}
            roughness={0.8}
            transparent={pollution > 0.6}
            opacity={pollution > 0.6 ? 0.7 : 1}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── Cottage (clean village) ─────────────────────────────────────────────────

/**
 * Cottage building model representing clean, eco-friendly village structures.
 * Only visible when pollution level is low.
 *
 * @private
 * @param {Object} props - Component props
 * @param {number[]} props.position - [x, y, z] position in 3D space
 * @param {number} props.rotation - Y-axis rotation in radians
 * @returns {React.ReactElement} Three.js Group with cottage geometry
 */
function Cottage({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Walls */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.2, 1, 1.2]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.7} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <coneGeometry args={[1, 0.7, 4]} />
        <meshStandardMaterial color="#c0392b" roughness={0.6} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.35, 0.61]}>
        <boxGeometry args={[0.3, 0.55, 0.05]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>
    </group>
  )
}

// ─── Factory (polluted village) ──────────────────────────────────────────────

/**
 * Factory building model representing industrial pollution.
 * Features an animated chimney with rising smoke puffs.
 * Only visible when pollution level is high.
 *
 * @private
 * @param {Object} props - Component props
 * @param {number[]} props.position - [x, y, z] position in 3D space
 * @returns {React.ReactElement} Three.js Group with factory geometry and animated smoke
 */
function Factory({ position }) {
  const smokeRef = useRef()

  useFrame(({ clock }) => {
    if (!smokeRef.current) return
    smokeRef.current.children.forEach((p, i) => {
      p.position.y = 2.5 + ((clock.elapsedTime * 0.8 + i * 0.5) % 3)
      p.material.opacity = 0.5 - (p.position.y - 2.5) / 6
    })
  })

  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 2, 1.5]} />
        <meshStandardMaterial color="#555" roughness={0.9} metalness={0.3} />
      </mesh>
      {/* Chimney */}
      <mesh position={[0.6, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 1.5, 6]} />
        <meshStandardMaterial color="#444" roughness={0.8} />
      </mesh>
      {/* Animated smoke puffs */}
      <group ref={smokeRef} position={[0.6, 2.5, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, i * 0.6, 0]}>
            <sphereGeometry args={[0.3 + i * 0.08, 8, 8]} />
            <meshStandardMaterial
              color="#888"
              transparent
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/**
 * Wind turbine model representing renewable energy infrastructure.
 * Blades rotate continuously based on elapsed time.
 * Only visible when pollution level is low (clean energy focus).
 *
 * @private
 * @param {Object} props - Component props
 * @param {number[]} props.position - [x, y, z] position in 3D space
 * @param {number} props.rotation - Y-axis rotation in radians
 * @returns {React.ReactElement} Three.js Group with turbine tower and animated blades
 */
function Turbine({ position, rotation = 0 }) {
  const bladesRef = useRef()

  useFrame(({ clock }) => {
    if (!bladesRef.current) return
    bladesRef.current.rotation.y = clock.elapsedTime * 1.4
  })

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.5, 8]} />
        <meshStandardMaterial color="#d9d9d9" roughness={0.4} />
      </mesh>
      <group ref={bladesRef} position={[0, 1.6, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 1.5, 0]}>
            <boxGeometry args={[0.05, 0.05, 1.2]} />
            <meshStandardMaterial color="#eef6ff" roughness={0.2} metalness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/**
 * Solar panel model representing renewable solar energy infrastructure.
 * Panel tilted at optimal angle for light capture.
 * Only visible when pollution level is low (clean energy focus).
 *
 * @private
 * @param {Object} props - Component props
 * @param {number[]} props.position - [x, y, z] position in 3D space
 * @param {number} props.rotation - Y-axis rotation in radians
 * @returns {React.ReactElement} Three.js Group with solar panel geometry
 */
function SolarPanel({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 5, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 0.08, 1.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.05, -0.6]} castShadow>
        <boxGeometry args={[1.8, 0.1, 0.2]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>
    </group>
  )
}

// ─── Ground & environment ────────────────────────────────────────────────────

/**
 * Main 3D village scene that transforms based on carbon score.
 * Animates smooth transitions between clean (eco-friendly) and polluted (industrial) states.
 * Manages all village buildings, trees, renewable energy, and sky elements.
 *
 * @private
 * @param {Object} props - Component props
 * @param {number} props.score - Carbon footprint score (0-1000) determining village state
 * @returns {React.ReactElement} Three.js scene with full village environment
 */
function VillageScene({ score }) {
  const pollution = getPollutionFactor(score)
  const [animatedPollution, setAnimatedPollution] = useState(pollution)

  useEffect(() => {
    let frame = null

    const animate = () => {
      setAnimatedPollution((prev) => {
        const next = prev + (pollution - prev) * 0.1
        if (Math.abs(pollution - next) < 0.002) {
          cancelAnimationFrame(frame)
          return pollution
        }
        return next
      })
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [pollution])

  const displayPollution = animatedPollution

  const skyColor = useMemo(
    () => lerpColor('#87CEEB', '#2c2c3e', displayPollution),
    [displayPollution],
  )
  const groundColor = useMemo(
    () => lerpColor('#3a7d44', '#3d3225', displayPollution),
    [displayPollution],
  )
  const fogColor = useMemo(
    () => lerpColor('#b0d4f1', '#4a4a5a', displayPollution),
    [displayPollution],
  )

  // Tree positions scattered around the village
  const treePositions = useMemo(
    () => [
      [-4, 0, -3], [4, 0, -2], [-3, 0, 3], [3.5, 0, 2.5],
      [-5.5, 0, 1], [5, 0, -4], [-2, 0, -5], [2, 0, 4],
      [-6, 0, -1], [6, 0, 1], [0, 0, -6], [-1, 0, 5],
    ],
    [],
  )

  const cottagePositions = useMemo(
    () => [
      [-2, 0, 0], [2, 0, -1], [0, 0, 2],
    ],
    [],
  )

  const factoryPositions = useMemo(
    () => [
      [-3, 0, -1], [3, 0, 1], [0, 0, -3],
    ],
    [],
  )

  const panelPositions = useMemo(
    () => [
      [-4.5, 0, 4.5], [4.5, 0, -4.5],
    ],
    [],
  )

  const turbinePositions = useMemo(
    () => [
      [-5, 0, 2], [5, 0, -2],
    ],
    [],
  )

  const showFactories = displayPollution > 0.35
  const factoryOpacity = Math.min(1, (displayPollution - 0.35) / 0.4)
  const showRenewables = score < 400

  return (
    <>
      {/* Sky & fog */}
      <color attach="background" args={[skyColor]} />
      <fog attach="fog" args={[fogColor, 8, 25 + pollution * 10]} />

      {/* Lighting shifts warm/clean → dim/smoggy */}
      <ambientLight intensity={0.4 + (1 - pollution) * 0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8 + (1 - pollution) * 0.5}
        color={pollution > 0.5 ? '#aaa' : '#fff8e7'}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {pollution > 0.4 && (
        <pointLight position={[-3, 2, -2]} color="#ff6600" intensity={pollution * 0.8} />
      )}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={groundColor} roughness={0.95} />
      </mesh>

      {/* Trees — fewer & smaller as pollution rises */}
      {treePositions.map((pos, i) => {
        const treePollution = Math.min(1, pollution + (i % 3) * 0.05)
        const scale = Math.max(0.3, 1 - pollution * 0.6)
        if (pollution > 0.75 && i % 2 === 0) return null
        return (
          <Tree
            key={i}
            position={pos}
            pollution={treePollution}
            scale={scale}
          />
        )
      })}

      {/* Clean cottages fade out as pollution increases */}
      {cottagePositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh visible={false}>
            <boxGeometry args={[0.01, 0.01, 0.01]} />
            <meshBasicMaterial transparent opacity={1 - factoryOpacity} />
          </mesh>
          {pollution < 0.85 && (
            <group scale={1 - factoryOpacity * 0.5}>
              <Cottage position={[0, 0, 0]} rotation={i * 1.2} />
            </group>
          )}
        </group>
      ))}

      {/* Factories appear as pollution rises */}
      {showFactories &&
        factoryPositions.map((pos, i) => (
          <group key={i} position={pos} scale={factoryOpacity}>
            <Factory position={[0, 0, 0]} />
          </group>
        ))}

      {/* Renewable infrastructure for cleaner worlds */}
      {showRenewables && (
        <>
          {panelPositions.map((pos, i) => (
            <SolarPanel key={`panel-${i}`} position={pos} rotation={i === 0 ? 0.35 : -0.35} />
          ))}
          {turbinePositions.map((pos, i) => (
            <Turbine key={`turbine-${i}`} position={pos} rotation={i * 0.4} />
          ))}
        </>
      )}

      {/* Clouds for clean sky */}
      {pollution < 0.6 && (
        <>
          <Cloud position={[-6, 5, -8]} speed={0.1} opacity={0.5} />
          <Cloud position={[5, 4.5, -6]} speed={0.15} opacity={0.4} />
          <Cloud position={[0, 6, -10]} speed={0.08} opacity={0.35} />
        </>
      )}

      {/* Smog clouds for polluted sky */}
      {pollution > 0.4 && (
        <>
          <Cloud
            position={[0, 3, -5]}
            speed={0.05}
            opacity={pollution * 0.6}
            color="#666"
          />
          <Cloud
            position={[-4, 2.5, -4]}
            speed={0.04}
            opacity={pollution * 0.5}
            color="#555"
          />
        </>
      )}

      {/* Stars visible only on cleaner nights (low pollution evening feel) */}
      {pollution < 0.3 && <Stars radius={50} count={800} factor={2} fade />}

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={6}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

// ─── Public export ───────────────────────────────────────────────────────────

/**
 * 3D village world visualization that morphs from green eco-paradise to industrial smoky zone.
 * Transforms based on user's carbon footprint score.
 * Displays interactive 3D scene with Thriving, Transitioning, or Polluted village states.
 * Uses Three.js for 3D rendering with animated transitions between states.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.score - Carbon footprint score (0-1000) determining village appearance
 * @returns {React.ReactElement} 3D canvas with village scene and overlay status label
 */
export default function World({ score }) {
  const pollution = getPollutionFactor(score)

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl border border-slate-700/60">
      {/* Pollution overlay label */}
      <div className="absolute left-4 top-4 z-10 rounded-lg bg-slate-950/70 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
        <span
          className={
            pollution < 0.4
              ? 'text-emerald-400'
              : pollution < 0.7
                ? 'text-yellow-400'
                : 'text-red-400'
          }
        >
          {pollution < 0.4
            ? '🌿 Thriving Village'
            : pollution < 0.7
              ? '⚠️ Struggling Ecosystem'
              : '🏭 Heavily Polluted'}
        </span>
      </div>

      <Canvas
        shadows
        camera={{ position: [8, 6, 8], fov: 45 }}
        gl={{ antialias: true }}
        style={{ background: 'transparent' }}
      >
        <VillageScene score={score} />
      </Canvas>
    </div>
  )
}

/**
 * PropTypes validation for World component props.
 */
World.propTypes = {
  /** Carbon footprint score between 0 and 1000 determining village appearance */
  score: PropTypes.number.isRequired,
}
