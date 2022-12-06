const input =
  "pqffvllhrhthvhshhpnhpnpqpvpvrpvpwvwjjdssmcsmccjvjmjjwnjwjwhjwwwzswwhvhwwlvvlbvbtbzbfbzbtbqbgbpbggwzggvjjdpdffbmffntncchtccbcffcjfjnjfnntssvtstzssmnnhrhlhbbwfwjfwjfwwbhhfhmmpsssbnssssfzzfpffdrdpdqqvnncjjgrjjmhhpqqcjqcjjzdzzpvvprrlglrrcmcqqtltdltddswsrrzzwgzzgssczcmzzmgmwgmggwwzttpccmcsmmvfvnvppzlzvzllgclggpfggfnfrfvrvwwvhwwvgwwrbbgfglflblzblzbznzhzffplffnrrcqqsgsvshvhlldhhvnhhmdddnssdvdwdwccggmddsmswwtctdtqqjsshhjzzdpdmpdmppjtjwjswjsjjjsdjjtrtbrbjjwwvnvppqphqhwhcwhwbbpgbbnhbnhhswwdswwlcczdztzbbbnwwtmmpvvgjjqgqdqzzdjdpjjnnffhccscvvchhbmbcbffpdpggvdvttpvpqqhggdtdhtdhhmghmgggzwgwrgwggwlggvpggcfcttzmtmgmvgmmpqmqlmqllsqqjbjwjsszczlzrzgrzzhshlhjjwttwnntbtjtjpplccqrqhrhssbmbttrddfvfwwjcwcvwcwwvpvggqwgwjgwgccvqqcmqqtqnqpnqnffdqfqhhqnhnmhmvhmhwwfrwrggnmmmcnmmgsszmzlmzmddcwwthtssgjsgjjgpgnppdqqcgqggzjgjngnrnggvffgddvtvctcftcftfnnnnhssbgsgwwthtqtltftqtnqttsrtrggwcgwcwmwgmgvmmzrmzrzjzmmcclmmtjmjhmmlhlwlppnpccbbrlrqrcrjrdrlrnngmnmvmcmzczztbblglccvzvppzspsddrzzlsllfzfsspnpdnpnvvvgmmpccmpcpgcpcwcddtmddgwgngqqcpqqlhqqczqqbvqqgdqgqmgmlmmvrrgfgzffbccldcdmmcmcgcngnghngngdngdndcncbbpqbbphbphpccpcwwjswwfttbqbsszccrbbdndsdrdqrqjrjjbmbtbdbbgbvgvcggwdwcccttqccnffjpjqqzpzlzvlljhhschhzlhhfhcfhchvcvtvtgvgzvzrvrdrgrwrjwjljhljlssszsqzsswhhmlhlrhlhzzgghjhzjjcllwrwtrrbdbrbnrnprnrffjvvphhvbbqbbscstsmslmlvmvrmmvvngnlnzzwqzzjqqsqbqrrtmrtmmfgmgrgjjtmjmrrddmrrqmrrjmjqmqnqmmcmlmfmffcgcclplffzvzwvzzjtztftqftqffjjpwjjbpjjggzdgzgwzzfrfvvhfvvwcvvbccfcvffpcpgpbbqhbbhmmzfmfvvnjvnjjhzhqqmffndndmmzhmmqnnlglvvjhjddvggqwgwdgwdggqbqgqrqlrrtptsswlssqwssbdsdrsddjsszjszjjpnjnvnjvnnmznmnddccpwwhshzzcfcqcwcddsjjmnjmjljwwgmglllqlhhctcvvqrvrrhfrrbcrrfbrfbrfrqffbwbqwbbjggsjjjnqqrqsqhhwnhnshnhhdjjqfqpqmmqgqgqggzmmnncrrpgglgqlqclqlsqqwnnfntnzttrnnmtmvvfppbrprzpzzdzvvtctnncpclpccsbbswwcscjssvhvhhqggzmgmqgmgwwgcwgccrllzhzzlzlbljbllmqqpjqqhrhqhjhbbjmjmhmddmwmcmvvmbbmvbmmznnwvwlwtllhwlwgwpgplgpgmgngjgglbglgmllvvlttgrrrlsrllghlggjdjwwfjwfjfvhjmgqnwhwpbdtzrphsqbmmvscslhbdzffsfshgsdjbqbwlgmrtschcnfhdlnndsvpwmwttfglpghhznmgfcjsdlwhnmfqvmpvhgpnnwtjfztbmtprqhsqtjwzhwcqjtjbtqwlcldnvggrwddmpllwnrqwdljwzfzqwcdwgqwvnthnrpcsfwrmqvbzjvzqnmdnfgtbzgtnrvblfwmhdsddgbffnjzvjzfpwglctpqhnqdvtblcchrlmndzhlsczgnsmnbwgnjngnjtlrdpfhqjrwcrqvcpspbtwcvgvvmpnwqjjpdpnslmcrcjnjmhqmrmfbcmrcmpbcbhpcvwqwflljfpgdvqhgdwgcphjqfnqzjjpsqnbtfzhftjtfcbhhcmmlwcfznsflfpphprrgvqwfgjcwfgjfsghzcbqrldwrjlzlbjhpgrbmgdpgzmfsqsphqbbslwwpzspccrhcfrgcjlfwhlcmzdcltbbpcrzglqgqntpwtmgstqlmcsqqbsqgmsmfznwcrfdgvsmnfqmwtsvqvlhwwjlrlhnsvcnrtwwmrjcgfncvlrcqrllndlvmrjpfjpgrrjcwhsqvlbtnlqgwjjqzwcvtvlnfnmqqshbcnqtcbvnwtwbfdgqmvnpmjhlsfdntfwwntvsrrsmspzqmglfnprjtdbmbgnplzzclsjpnzwdhcbhpfnqrgmgqtpfhgnfbqhrpmznbrshjhntzctslwhtgtjvpqhntmchhtncfjmbzcgnpcbpmldrtnpvrzqfftbjjcjlpwwgvmnstjghftcczjzfsftgzpfhbspqmrbfhcdfmqbrgrbsmjvgpbrnvbblwwvqzzpmqrspzvzppjfbgfftdvsdvmrjzhfslptzmgndnqqgmrrfnbbpvbmvpngwjhzvfbwfnzlrgwffvjsfdldfgchfjmnzfnzhwrwttrzlrhmnwvjjdqfmbpfllhrgmddjgnwjnbqwjnslcrdjrmnldcpsgzjpdhrpdfwhbvwhwnhcsmwcwstvqrcrqsnvjrzljfgbljfszchbsqnldgntvcscwqqmpnlwtlfmswtmvrlpzgbrjhtgjgpnhggnprpvwfqpjffqhtfvpnrptgrtwzzlvplgnfjmqphgmnssccrdndqgpljtwtntshrpgsjcdrpmccjnjdgmpmzbfhqjzphcswtwvvqcrwsjhtdqgrhqjmjjcrblpswcblnpzvfztqtbpgjcgngqmwrjtlmhvlsbmrdzwlgqlfqcqnsnjcnddssqbftjvnlgcwwfcgdpdmqrdsjmcnzrfrpnvjmbsltpzwjhjzqqvbgrltczbgvcpwdzqsvhddsbjgjgcmnldrfhnhddlvjcvsnghprjwlghhtghldcqsdcdgnmbcjglvjjvvlbhzczlmjsdqtdpzdtvfztgsdfjsdtfchvzcgvhjnnncmsrfvvmcsjjdftmlpczgvtwngssqmzlmsrrsrbhhhrnwqhmpcdvqmdsvvtsgsqfdcpgsdgzvmbzpbpgtcbshnvdzlmpnwmqrvnmrjprmvppjwfbjhlhzsfhqqzmpbclqvsvfrcqwprrcvqcbbwvnqfwnrgjhlwmgzpfspqrvqrhmqnwvzjrhvvgdgswlvzjjhjtdctlthlpzqhjvwwbpsclpgflcnsdshrqbhmczcwljqlndfnfrcdgmptpsltrcjccnpdchgnswdcpsslcslcjznzpgfhznhbgqhdqvddmqzdnmpshhdcjrsmfjllhfvjvmzzhzrvlbpzqngwmlwcmqnppqzncvjshfrpjlptvnqfrfcrfnbhwhpdqqvjhsqvsmprtgfrddwzjzlwhhqvjpfrwgwvwpszzsfzwjtwngdjfllhjrmqjtmvwsvggnswpqpjbtcrnhhhlzbrvhjdstnpctjlgsffrrbfdvjzhwsgthgfsqnvqdcjffsttlrjnhtqqdpfqpjtdgfwcdwzmwfvqgglsrmmqwbszclpzwldwcswpwfwldrfmmdndcptjbmnvgcpntqcdrcffvgnlpjmcqjpfmbmwjfpqzbzhqtqbzsghbnfvhphfzzhfznttpfrqwpmzjchpzzrdclhdltlqbjmjdfdjqlqbwptsghcnvtdscwgpqnlhhvsvglplhlrwpnzmdbsbrlhmpczzfz";

export function scan(size: number, input: string): string {
  let seenchars = "";
  for (let i = 0; i < input.length - size; i++) {
    const s = new Set([...input.slice(i, i + size)]);
    if (s.size === size) {
      seenchars = input.slice(0, i + size);
      break;
    }
  }
  return seenchars;
}

console.log(`Day 6 ⭐: ${scan(4, input).length}`);
console.log(`Day 6 ⭐⭐: ${scan(14, input).length}`);
