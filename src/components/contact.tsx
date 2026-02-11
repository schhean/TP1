import { StyleSheet, Text } from 'react-native';

type ContactProps = {
  name: string;
  phone: string;
  onPress: () => void;
};

function Contact(props: ContactProps) {
  return (
    <Text>
      Nom : {props.name} - Téléphone : {props.phone}
    </Text>
  );
}

export default Contact;
