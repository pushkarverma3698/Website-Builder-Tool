import { createContext, useContext, useState, useCallback } from 'react'

const SceneContext = createContext({ progress: 0, sceneIndex: 0, setProgress: () => {} })

export function SceneProvider({ children }) {
  const [progress, setProgressRaw] = useState(0)
  const [sceneIndex, setSceneIndex] = useState(0)

  const setProgress = useCallback((p) => {
    setProgressRaw(p)
    setSceneIndex(Math.min(5, Math.floor(p * 6)))
  }, [])

  return (
    <SceneContext.Provider value={{ progress, sceneIndex, setProgress }}>
      {children}
    </SceneContext.Provider>
  )
}

export const useScene = () => useContext(SceneContext)
