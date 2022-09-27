import { useContext } from "react"
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { FormContainer, MinutesAmount, TaskInput } from "./styles"


export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();
    return (

        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text" list="task-suggestions"
                id="task" placeholder="De um nome para o seu projeto"
                {...register('task')}
                disabled={!!activeCycle}
            />

            <datalist id="task-suggestions">
                <option value="Estudar React-Js" />
                <option value="Trabalhar na minha issue" />

            </datalist>
            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmount
                type="number"
                id="minutesAmount"
                step={1} min={1} max={60}
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={!!activeCycle}
            />

            <span>minutos.</span>

        </FormContainer>
    )


}