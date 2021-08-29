
export function formatPostData(data)
{
    let newData = new FormData();
    if (data instanceof FormData)
    {
        newData = data;
        for (let entry of data.getParts())
        {
            if (entry)
            {
                let name = entry.fieldName;
                let value = entry.string;
                value = value.split('"').join("''");
                value = value.split("--").join("- -");
                value = value.split("#").join("");
                newData.append(name,value);
                
            }
        }
    }
    return newData;
}