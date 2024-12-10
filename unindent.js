
// Count the number of spaces at the start of a string
// expanding tabs.  Returns the number of spaces, or undefined
// if the entire line is whitespace
export function count_spaces(str, tabsize)
{
    tabsize = tabsize ?? 4;

    let spaces = 0;
    for (let i=0; i<str.length; i++)
    {
        if (str[i] == ' ')
        {
            spaces++;
            continue;
        }

        if (str[i] == '\t')
        {
            spaces += tabsize - (spaces % tabsize);
            continue;
        }

        return spaces;
    }
    return undefined;
}

// Remove spaces from the start of a string, expanding tabs as required
export function trim_spaces(str, spaces, tabsize)
{
    tabsize = tabsize ?? 4;

    let consumed = 0;
    let i;
    for (i=0; i<str.length && consumed < spaces; i++)
    {
        if (str[i] == ' ')
        {
            consumed++;
            continue;
        }
        if (str[i] == '\t')
        {
            let expanded_size = tabsize - (consumed % tabsize)
            if ((spaces - consumed) >= expanded_size)
            {
                consumed += expanded_size;
            }
            else
            {
                return " ".repeat(expanded_size - (spaces - consumed)) + str.substring(i + 1);
            }
        }
    }

    // Trim it
    return str.substring(i);
}

export function unindent(str, tabsize) {

    if (tabsize === undefined)
        tabsize = 4;

    // Split the string into lines
    let lines = str.split(/\r\n|\n\r|\n|\r/);

    // Work out how common white space at the start of all lines
    let common = null;
    for (let l of lines)
    {
        let spaces = count_spaces(l, tabsize);

        // Ignore completely whitespace lines
        if (spaces === undefined)
            continue;

        if (common == null)
        {
            common = spaces;
        }
        else
        {
            if (spaces < common)
                common = spaces;
        }
    }

    // No common white space, quit early
    if (common == 0)
        return str;

    return lines.map(x => trim_spaces(x, common, tabsize)).join("\n");
}

