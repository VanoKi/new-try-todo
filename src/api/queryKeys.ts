export const queryKeys = {
    todolists: ['todolists'] as const,
    tasks : (todolistId: string) => ['tasks', todolistId] as const
}