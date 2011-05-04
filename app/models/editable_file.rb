class EditableFile < EditableElement

  mount_uploader :source, EditableFileUploader

  def content
    el = inherited_editable_element_or_self
    el.source? ? el.source.url : el.default_content
  end

  

end