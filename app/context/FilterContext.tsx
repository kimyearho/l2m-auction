import { createContext, useContext, useState } from 'react'

interface IContext {
  children: JSX.Element | JSX.Element[]
}

const FilterContext = createContext({
  ctxGradeFilter: '',
  onChangeFilterContext: (e: string) => {},
})

const FilterProvider = (props: IContext): JSX.Element => {
  const [ctxGradeFilter, setGradeFilter] = useState<string>('')

  const onChangeFilterContext = (value: string) => {
    setGradeFilter(value)
  }

  return (
    <FilterContext.Provider value={{ ctxGradeFilter, onChangeFilterContext }}>
      {props.children}
    </FilterContext.Provider>
  )
}

const FilterProviderContext = () => {
  return useContext(FilterContext)
}

export { FilterContext, FilterProvider, FilterProviderContext }
