import { UrlTree, DefaultUrlSerializer, UrlSerializer } from '@angular/router';

export class SlashAppendedUrlSerializer implements UrlSerializer {
  private defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  parse(url: string): UrlTree {
    // Delegate the parsing of the URL to the default serializer.
    return this.defaultUrlSerializer.parse(url);
  }

  serialize(tree: UrlTree): string {
    // Use the default serializer to serialize the URL tree to a string.
    let serializedUrl = this.defaultUrlSerializer.serialize(tree);
    // If the URL doesn't end with a slash and is not empty, append one.
    if (!serializedUrl.endsWith('/') && serializedUrl !== '') {
      serializedUrl += '/';
    }
    return serializedUrl;
  }
}
