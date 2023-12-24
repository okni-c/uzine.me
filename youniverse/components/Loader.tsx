import { DNA, Radio } from 'react-loader-spinner'

export default function Loader({ type }: any) {
    if (type === 'DNA') {
        return (
            <DNA
                visible={true}
                height="40"
                width="40"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        )
    }

    if (type === 'Radio') {
        return (
            <Radio
                visible={true}
                height="80"
                width="80"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass="radio-wrapper"
            />
        )
    }
}