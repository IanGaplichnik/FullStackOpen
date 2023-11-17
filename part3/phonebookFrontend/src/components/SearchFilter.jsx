const SearchFilter = ({ filterKey, onChangeHandler }) => {
  return (
    <form>
      <div>
        filter shown with <input value={filterKey} onChange={onChangeHandler} />
      </div>
    </form>
  )
}

export default SearchFilter