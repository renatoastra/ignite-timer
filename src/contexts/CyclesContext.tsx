import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { json } from "react-router-dom";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { cyclesReducer } from "../reducers/cycles/reducer";

interface Cycle {
    id: string,
    task: string;
    minutesAmount: number;
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CycleContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

interface CycleContextProviderProps {
    children: ReactNode;
}


export function CyclesContextProvider({ children }: CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        cyclesReducer,
        {
            cycles: [],
            activeCycleId: null
        },
        () => {
            const storageStateAsJSON = localStorage.getItem('@igniter-timer:cycles-state-1.0.0');

            if (storageStateAsJSON) {
                return JSON.parse(storageStateAsJSON);
            }

            return {
                cycles: [],
                activeCycleId: null
            }
        },
    )

    useEffect(() => {

        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem('@igniter-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    const { activeCycleId, cycles } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId && !cycle.finishedDate);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        return 0
    });


    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0);
    }


    function interruptCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    function markCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())

    }
    return (
        <CyclesContext.Provider value={{ cycles, activeCycle, activeCycleId, markCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCycle }}>
            {children}
        </CyclesContext.Provider>
    )
}