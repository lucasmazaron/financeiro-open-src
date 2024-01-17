/* eslint-disable prefer-arrow/prefer-arrow-functions */
export function formatDocument(value: number): string {
  const cnpjCpf = value?.toString().replace(/\D/g, '');

  if (cnpjCpf?.length === 11) {
    return cnpjCpf
      ?.padStart(11, '0')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  return cnpjCpf
    ?.padEnd(14, '0')
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
}
