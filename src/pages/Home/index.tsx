import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./style";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number()
})

type newCycleFormData = zod.infer<typeof newCicleFormValidationSchema>


export function Home() {

    const { activeCycle, createNewCycle, interruptCycle } = useContext(CyclesContext);
    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCicleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });
    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: newCycleFormData) {
        createNewCycle(data);
        reset();
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountDownButton type="button" onClick={interruptCycle} >
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>) :
                    (
                        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                            <Play size={24} />
                            Comecar
                        </StartCountDownButton>)}
            </form>
        </HomeContainer>
    )
}