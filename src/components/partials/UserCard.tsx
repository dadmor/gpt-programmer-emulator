interface Props {
    data:any
  }
export const UserCard: React.FC<Props> = ({data}) => {
    return (
        <div className="flex gap-3 border">
        <img width="100" height="auto" src={data.avatar_url} />
        <div className="pt-1 pr-3">
          <p>
            Reverse GitHub repos{" "}
            <span className="text-stone-400 border bg-emerald-100">
              GPT
            </span>{" "}
            analyzer
          </p>

          <p>
            Hello: <b>{data.login}</b>
          </p>
        </div>
      </div>
    );
  };
  